import { useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  SalesBaseRow,
  OrderTypeRequest,
  OrderTypeResponse,
} from "@/types/sales";
import {
  confirmOrder,
  getSalesDetailGeneral,
  getSalesDetailSubscribe,
} from "@/api/sales/sales";
import { useConfirmOrder } from "@/api/sales/mutations/useConfirmOrder";
import { useUnConfirmOrder } from "@/api/sales/mutations/useUnConfirmOrder";
import { useRegisterDeliveryInfo } from "@/api/sales/mutations/useRegisterDeliveryInfo";
import { useCancelOrderBySeller } from "@/api/sales/mutations/useCancelOrderBySeller";
import { PRODUCT_TYPE } from "@/constants/sales";
import { useToastStore } from "@/store/useToastStore";
import { useRegisterGoodsFlowOrder } from "@/api/sales/mutations/\buseRegisterGoodsFlowOrder";
import popupWindow from "@/utils/popupWindow";

interface LoadingState {
  confirm: boolean;
  deny: boolean;
  delivery: boolean;
  cancel: boolean;
  manage: boolean;
}

export function useOrderActions(
  allOrders: SalesBaseRow[],
  selectedIds: number[],
  orderType: OrderTypeResponse
) {
  const { addToast } = useToastStore();

  const { mutate: confirmOrder } = useConfirmOrder();
  const { mutate: unConfirmOrder } = useUnConfirmOrder();
  const { mutateAsync: registerDeliveryInfo } = useRegisterDeliveryInfo();
  const { mutate: cancelOrderBySeller } = useCancelOrderBySeller();
  // const { mutateAsync: getGoodsFlowOtp } = useGetGoodsFlowOtp();
  // const { mutateAsync: getGoodsFlowContract } = useGetGoodsFlowContract();
  const { mutateAsync: registerGoodsFlowOrder } = useRegisterGoodsFlowOrder();

  // 선택된 주문 데이터만
  const selectedItems = useMemo(
    () => allOrders.filter((o) => selectedIds.includes(o.id)),
    [allOrders, selectedIds]
  );

  // 1) 주문확인
  const handleConfirm = () => {
    if (!selectedIds.length) return addToast("선택된 상품이 없습니다.");
    const invalid = selectedItems.filter(
      (i) => i.orderStatus !== "PAYMENT_DONE"
    );
    if (invalid.length)
      return addToast("결제완료 상태가 아닌 상품이 포함되어 있습니다.");

    if (!confirm(`선택하신 ${selectedIds.length}개를 주문확인 하시겠습니까?`))
      return;

    const body =
      orderType === PRODUCT_TYPE.GENERAL
        ? { orderItemIdList: selectedIds }
        : { orderIdList: selectedIds };

    confirmOrder(
      { orderType, body },
      {
        onSuccess: () => {
          addToast("주문확인 처리되었습니다.");
          // 쿼리 재요청
        },
        onError: () => {
          addToast("주문확인에 실패했습니다.");
        },
      }
    );
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

    unConfirmOrder(
      { orderType, orderIdList: selectedIds },
      {
        onSuccess: () => {
          addToast("확인취소 처리되었습니다");
          //쿼리 재요청
        },
        onError: (err: any) => {
          addToast("확인취소에 실패했습니다");
        },
      }
    );
  };

  // 3) 주문발송
  const handleDelivery = async () => {
    if (!selectedIds.length) return addToast("선택된 상품이 없습니다.");
    const invalid = selectedItems.filter((i) =>
      orderType === PRODUCT_TYPE.GENERAL
        ? i.orderStatus !== "DELIVERY_READY"
        : i.orderStatus !== "PRODUCING"
    );
    if (invalid.length)
      return addToast("발송 준비 상태가 아닌 상품이 포함되어 있습니다.");
    if (
      !window.confirm(
        `선택하신 ${selectedIds.length}개를 발송처리 하시겠습니까?`
      )
    )
      return;

    try {
      // 3-1) 상세 주문 조회
      const orderList = [] as Array<{
        orderId: number;
        selectOptionList: any[] | null;
      }>;
      for (const id of selectedIds) {
        if (orderType === PRODUCT_TYPE.GENERAL) {
          const detail = await getSalesDetailGeneral(id);
          const selectOptionList = detail.orderItemAndOptionDtoList.flatMap(
            (item) =>
              item.selectOptionDtoList.map((opt) => ({
                selectOptionId: opt.optionId,
                selectOptionAmount: opt.amount,
              }))
          );
          orderList.push({ orderId: id, selectOptionList });
        } else {
          await getSalesDetailSubscribe(id);
          orderList.push({ orderId: id, selectOptionList: null });
        }
      }

      // 3-2) 배송 정보 등록 요청
      const infos = await registerDeliveryInfo({ orderList });

      const gfRes = await registerGoodsFlowOrder({
        items: infos.map((info) => ({
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
          orderItems: info.orderItems.map((item) => ({
            uniqueCd: item.uniqueCd,
            ordNo: item.ordNo,
            itemName: item.itemName,
            itemQty: item.itemQty,
            ordDate: item.ordDate,
          })),
          status: "N",
          paymentTypeCode: "SH",
        })),
      });
      if (!gfRes.success) throw new Error(gfRes.error.message);

      // 인쇄 팝업
      const otp = await getGoodsFlowOtp();
      const printRes = await printGoodsFlow({ otp, id: gfRes.id });
      if (printRes.data) {
        popupWindow(`/bf-admin/sell/delivery/print?data=${printRes.data}`);
      }
    } catch (error: any) {
      addToast(`발송 처리 중 오류가 발생했습니다.\n${error.message || error}`);
    }
  };

  // 4) 판매취소
  const handleCancel = () => {
    if (!selectedIds.length) return addToast("선택된 상품이 없습니다.");
    const reason = prompt("판매취소 사유를 입력해주세요.");
    if (!reason) return addToast("사유가 필요합니다.");
    if (
      !window.confirm(
        `선택하신 ${selectedIds.length}개를 판매취소 하시겠습니까?`
      )
    )
      return;

    const body =
      orderType === PRODUCT_TYPE.GENERAL
        ? {
            orderItemIdList: selectedIds,
            reason: "SELLER_CANCEL_GENERAL",
            detailReason: reason,
          }
        : {
            orderIdList: selectedIds,
            reason: "SELLER_CANCEL_SUBSCRIBE",
            detailReason: reason,
          };

    cancelOrderBySeller(
      { orderType, body },
      {
        onSuccess: () => addToast("판매취소 처리되었습니다."),
        onError: (error: any) =>
          addToast(`판매취소에 실패했습니다.\n${error.message || error}`),
      }
    );
  };

  // 5) 굿스플로 택배사 관리
  const handleManage = async () => {
    try {
      const otp = await getGoodsFlowOtp();
      await getGoodsFlowContract({ otp });
      const printRes = await printGoodsFlow({ otp, id: undefined });
      if (printRes.data) {
        popupWindow(`/sales/delivery/print?data=${printRes.data}`);
      }
    } catch {
      addToast("굿스플로 호출 오류");
    }
  };

  return {
    handlers: {
      handleConfirm,
      handleDeny,
      handleDelivery,
      handleCancel,
      handleManage,
    },
  };
}
