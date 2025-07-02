import { useMemo, useState } from "react";
import {
  SalesBaseRow,
  OrderTypeResponse,
  OrderTypeRequest,
} from "@/types/sales";

import { useConfirmOrder } from "@/api/sales/mutations/useConfirmOrder";
import { useUnConfirmOrder } from "@/api/sales/mutations/useUnConfirmOrder";
import { useRegisterDeliveryInfo } from "@/api/sales/mutations/useRegisterDeliveryInfo";
import { useCancelOrderBySeller } from "@/api/sales/mutations/useCancelOrderBySeller";
import { PRODUCT_TYPE } from "@/constants/sales";
import { useToastStore } from "@/store/useToastStore";
import { useGoodsFlowOrderRegister } from "@/api/goodsflow/mutations/useOrderRegister";
import { useGoodsFlowContractList } from "@/api/goodsflow/mutations/useContractList";
import { useGoodsFlowOtp } from "@/api/goodsflow/mutations/useGetOtp";
import { useGoodsFlowPrint } from "@/api/goodsflow/mutations/usePrint";
import { useGoodsFlowCancelOrder } from "@/api/goodsflow/mutations/useCancelOrder";
import useModal from "./useModal";
import { getSalesDetailGeneral } from "@/api/sales/sales";
import openPopup from "@/utils/openPopup";

export function useOrderActions(
  allOrders: SalesBaseRow[],
  selectedIds: number[],
  orderTypeReq: OrderTypeRequest
) {
  const { addToast } = useToastStore();
  const {
    isOpen: isCancelModalOpen,
    onClose: onCancelModalClose,
    onToggle: onCancelModalToggle,
  } = useModal();
  const [cancelReason, setCancelReason] = useState("");
  const { mutate: confirmOrder } = useConfirmOrder();
  const { mutate: unConfirmOrder } = useUnConfirmOrder();
  const { mutateAsync: registerDeliveryInfo } = useRegisterDeliveryInfo();
  const { mutate: cancelOrderBySeller } = useCancelOrderBySeller();

  // goodsflow 훅
  const { mutateAsync: getOtp } = useGoodsFlowOtp();
  const { mutateAsync: getContractList } = useGoodsFlowContractList();
  const { mutateAsync: registerGoodsFlowOrder } = useGoodsFlowOrderRegister();
  const { mutateAsync: printGoodsFlow } = useGoodsFlowPrint();
  // 재발송 처리시에 사용
  const { mutateAsync: cancelGoodsFlowOrder } = useGoodsFlowCancelOrder();

  const orderType =
    orderTypeReq === "GENERAL"
      ? "general"
      : orderTypeReq === "SUBSCRIBE"
      ? "subscribe"
      : (null as any as OrderTypeResponse);

  // 선택된 주문 데이터만
  const selectedItems = useMemo(
    () => allOrders.filter((o) => selectedIds.includes(o.id)),
    [allOrders, selectedIds]
  );

  // 1) 주문확인
  const handleConfirm = async () => {
    if (!selectedIds.length) {
      addToast("선택된 상품이 없습니다.");
      return;
    }
    const invalid = selectedItems.filter(
      (i) => i.orderStatus !== "PAYMENT_DONE"
    );
    if (invalid.length) {
      addToast("결제완료 상태가 아닌 상품이 포함되어 있습니다.");
      return;
    }
    if (!confirm(`선택하신 ${selectedIds.length}개를 주문확인 하시겠습니까?`)) {
      return;
    }

    try {
      let confirmList: number[] = [];

      if (orderTypeReq === "GENERAL") {
        // GENERAL: orderItemIdList 를 위해 상세정보에서 orderItemId 들만 꺼내 모아줌
        for (const orderId of selectedIds) {
          const detail = await getSalesDetailGeneral(orderId);
          const itemIds = detail.orderItemAndOptionDtoList.map(
            (l) => l.orderItemDto.orderItemId
          );
          confirmList.push(...itemIds);
        }
      } else {
        // SUBSCRIBE: orderIdList 에 그대로 사용
        confirmList = [...selectedIds];
      }

      const body =
        orderType === PRODUCT_TYPE.GENERAL
          ? { orderItemIdList: confirmList }
          : { orderIdList: confirmList };

      confirmOrder({ orderType, body });
    } catch (err: any) {
      addToast("주문확인 중 오류가 발생했습니다.");
    }
  };

  // 2) 확인취소
  const handleDeny = () => {
    if (!selectedIds.length) return addToast("선택된 상품이 없습니다");
    const invalid = selectedItems.filter((i) =>
      orderType === PRODUCT_TYPE.GENERAL
        ? i.orderStatus !== "DELIVERY_READY"
        : i.orderStatus !== "PRODUCING"
    );
    if (invalid.length)
      return addToast("취소 가능 상태가 아닌 상품이 포함되어 있습니다");

    if (!confirm(`선택하신 ${selectedIds.length}개를 확인취소 하시겠습니까?`))
      return;

    unConfirmOrder({ orderType, orderIdList: selectedIds });
  };

  // 3) 주문발송
  const handleDelivery = async () => {
    if (!selectedIds.length) {
      addToast("선택된 상품이 없습니다.");
      return;
    }
    const invalid = selectedItems.filter((i) =>
      orderTypeReq === "GENERAL"
        ? i.orderStatus !== "DELIVERY_READY"
        : i.orderStatus !== "PRODUCING"
    );
    if (invalid.length) {
      addToast("발송 준비 상태가 아닌 상품이 포함되어 있습니다.");
      return;
    }
    if (
      !window.confirm(
        `선택하신 ${selectedIds.length}개를 발송처리 하시겠습니까?`
      )
    ) {
      return;
    }

    try {
      // --- 누락된 부분: selectOptionList 채워서 BE 주문발송 API에 넘기기 ---
      const orderListReq = await Promise.all(
        selectedIds.map(async (orderId) => {
          if (orderTypeReq === "GENERAL") {
            const detail = await getSalesDetailGeneral(orderId);
            const selectOptionList = detail.orderItemAndOptionDtoList.flatMap(
              (item) =>
                item.selectOptionDtoList.map((opt) => ({
                  selectOptionId: opt.optionId,
                  selectOptionAmount: opt.amount,
                }))
            );
            return { orderId, selectOptionList };
          } else {
            // SUBSCRIBE
            return { orderId, selectOptionList: null };
          }
        })
      );

      // 3-1) BE에서 배송정보 조회
      const deliveryInfos = await registerDeliveryInfo({
        orderList: orderListReq,
      });

      // 3-2) GoodsFlow에 주문 등록
      const gfOrderRes = await registerGoodsFlowOrder({
        items: deliveryInfos.map((info) => ({
          transUniqueCd: info.transUniqueCd,
          sndName: info.sndName,
          sndZipCode: info.sndZipCode,
          sndAddr1: info.sndAddr1,
          sndAddr2: info.sndAddr2,
          sndTel1: info.sndTel1,
          rcvName: info.rcvName,
          rcvZipCode: info.rcvZipCode,
          rcvAddr1: info.rcvAddr1,
          rcvAddr2: info.rcvAddr2,
          rcvTel1: info.rcvTel1,
          mallId: info.mallId,
          msgToTrans: info.request,
          orderItems: info.orderItems,
          status: "N",
          paymentTypeCode: "SH",
        })),
      });
      if (!gfOrderRes.success) {
        throw new Error(
          gfOrderRes.error?.message ?? "GoodsFlow 주문 등록에 실패했습니다."
        );
      }

      // 3-3) 인쇄 팝업
      const otp = await getOtp();
      const printRes = await printGoodsFlow({ otp, id: gfOrderRes.id });
      if (printRes) {
        openPopup(`/sales/delivery/print?data=${encodeURIComponent(printRes)}`);
      }
    } catch (err: any) {
      addToast(`발송 처리 중 오류가 발생했습니다.\n${err.message || err}`);
    }
  };

  // 4) 판매취소 - 모달 열기
  const handleCancel = () => {
    if (!selectedIds.length) {
      addToast("선택된 상품이 없습니다.");
      return;
    }
    onCancelModalToggle(); // 모달 열기
  };

  // 4-2) 모달에서 ‘판매 취소’ 클릭
  const handleCancelConfirm = () => {
    if (!cancelReason.trim()) {
      addToast("사유를 입력해주세요.");
      return;
    }

    const body =
      orderType === PRODUCT_TYPE.GENERAL
        ? {
            orderItemIdList: selectedIds,
            reason: "SELLER_CANCEL_GENERAL",
            detailReason: cancelReason,
          }
        : {
            orderIdList: selectedIds,
            reason: "SELLER_CANCEL_SUBSCRIBE",
            detailReason: cancelReason,
          };

    cancelOrderBySeller(
      { orderType, body },
      {
        onSuccess: () => {
          addToast("판매취소 처리되었습니다.");
          onCancelModalClose();
          setCancelReason("");
        },
        onError: (err: any) => {
          addToast(`판매취소에 실패했습니다.\n${err.message || err}`);
        },
      }
    );
  };

  // 5) 굿스플로 택배사 관리
  const handleManage = async () => {
    try {
      const otp = await getOtp();
      await getContractList(otp);
      const printRes = await printGoodsFlow({ otp });
      if (printRes) {
        openPopup(`/sales/delivery/print?data=${encodeURIComponent(printRes)}`);
      }
    } catch {
      addToast("굿스플로 호출 오류");
    }
  };

  // 6) 송장 재출력 // 필터 추가
  // const handleReprintInvoice = async () => {
  //   if (!selectedIds.length) return addToast("선택된 상품이 없습니다.");
  //   if (
  //     !window.confirm(
  //       `선택하신 ${selectedIds.length}개 송장을 재출력 하시겠습니까?`
  //     )
  //   )
  //     return;

  //   try {
  //     // 6-1) BE: 배송정보 조회
  //     const orderListReq = selectedIds.map((id) => ({
  //       orderId: id,
  //       selectOptionList: null,
  //     }));
  //     const infos = await registerDeliveryInfo({ orderList: orderListReq });

  //     // 6-2) 기존 GoodsFlow 주문 취소
  //     for (const info of infos) {
  //       const cancelRes = await cancelGoodsFlowOrder(info.transUniqueCd);
  //       if (!cancelRes.success) {
  //         console.error(`송장취소 실패: ${cancelRes.error?.message}`);
  //       }
  //     }

  //     // 6-3) GoodsFlow 재등록
  //     const gfOrderRes = await registerGoodsFlowOrder({
  //       items: infos.map((info) => ({
  //         transUniqueCd: info.transUniqueCd,
  //         sndName: info.sndName,
  //         sndZipCode: info.sndZipCode,
  //         sndAddr1: info.sndAddr1,
  //         sndAddr2: info.sndAddr2,
  //         sndTel1: info.sndTel1,
  //         rcvName: info.rcvName,
  //         rcvZipCode: info.rcvZipCode,
  //         rcvAddr1: info.rcvAddr1,
  //         rcvAddr2: info.rcvAddr2,
  //         rcvTel1: info.rcvTel1,
  //         mallId: info.mallId,
  //         msgToTrans: info.request,
  //         orderItems: info.orderItems,
  //         status: "N",
  //         paymentTypeCode: "SH",
  //       })),
  //     });
  //     if (!gfOrderRes.success)
  //       throw new Error(
  //         gfOrderRes.error?.message ?? "송장 재출력에 실패했습니다"
  //       );

  //     // 6-4) 인쇄 팝업
  //     const otp = await getOtp();
  //     const printData = await printGoodsFlow({ otp, id: gfOrderRes.id });
  //     if (printData) {
  //       openPopup(
  //         `/bf-admin/sell/delivery/print?data=${encodeURIComponent(printData)}`
  //       );
  //     }
  //   } catch (err: any) {
  //     addToast(`송장 재출력 중 오류가 발생했습니다.\n${err.message}`);
  //   }
  // };

  return {
    handleConfirm,
    handleDeny,
    handleDelivery,
    handleCancel,
    handleManage,
    // handleReprintInvoice,

    isCancelModalOpen,
    handleCancelConfirm,
    cancelReason,
    setCancelReason,
    onCancelModalClose,
  };
}
