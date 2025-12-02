import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  SalesBaseRow,
  OrderTypeResponse,
  OrderTypeRequest,
  SalesDetailGeneralResponse,
} from "@/types/sales";
import { format, parseISO } from "date-fns";

import { useConfirmOrder } from "@/api/sales/mutations/useConfirmOrder";
import { useUnConfirmOrder } from "@/api/sales/mutations/useUnConfirmOrder";
import { useRegisterDeliveryInfo } from "@/api/sales/mutations/useRegisterDeliveryInfo";
import { useCancelOrderBySeller } from "@/api/sales/mutations/useCancelOrderBySeller";
import { CANCEL_REASON, PRODUCT_TYPE } from "@/constants/sales";
import { useToastStore } from "@/store/useToastStore";
import { useGoodsFlowOrderRegister } from "@/api/goodsflow/mutations/useOrderRegister";
import { useGoodsFlowContractList } from "@/api/goodsflow/mutations/useContractList";
import { useGoodsFlowOtp } from "@/api/goodsflow/mutations/useGetOtp";
import { useGoodsFlowPrint } from "@/api/goodsflow/mutations/usePrint";
import { useGoodsFlowCancelOrder } from "@/api/goodsflow/mutations/useCancelOrder";
import useModal from "./useModal";
import { getSalesDetailGeneral } from "@/api/sales/sales";
import openPopup from "@/utils/openPopup";
import { TableItem } from "@/types/common";
import { useForcedDeliveryComplete } from "@/api/sales/mutations/useForcedDeliveryComplete";

export function useOrderActions(
  allOrders: SalesBaseRow[],
  selectedIds: number[],
  setSelectedIds: Dispatch<SetStateAction<number[]>>,
  orderTypeReq: OrderTypeRequest
) {
  const { addToast } = useToastStore();

  // 판매 취소 모달
  const {
    isOpen: isCancelModalOpen,
    onClose: onCancelModalClose,
    onToggle: onCancelModalToggle,
  } = useModal();

  // 일반 상품 상세 모달
  const {
    isOpen: isDetailModalOpen,
    onClose: onCloseDetailModal,
    onToggle: onToggleDetailModal,
  } = useModal();

  // 주문 발송 묶음 배송 포함 알림 모달
  const {
    isOpen: isDeliveryAlertOpen,
    onClose: onDeliveryAlertClose,
    onToggle: onDeliveryAlertToggle,
  } = useModal();

  const [detailData, setDetailData] = useState<
    Array<{ orderId: number; items: TableItem[] }>
  >([]);

  const [cancelReason, setCancelReason] = useState("");
  const { mutate: confirmOrder, isPending: isConfirmPending } =
    useConfirmOrder();
  const { mutate: unConfirmOrder, isPending: isUnConfirmPending } =
    useUnConfirmOrder();
  const {
    mutateAsync: registerDeliveryInfo,
    isPending: isRegisterDeliveryPending,
  } = useRegisterDeliveryInfo();
  const { mutate: cancelOrderBySeller, isPending: isCancelPending } =
    useCancelOrderBySeller();
  const { mutate: forcedDeliveryComplete, isPending: isForcedCompletePending } =
    useForcedDeliveryComplete();

  // goodsflow 훅
  const { mutateAsync: getOtp, isPending: isOtpPending } = useGoodsFlowOtp();
  const {
    mutateAsync: registerGoodsFlowOrder,
    isPending: isGoodsFlowRegisterPending,
  } = useGoodsFlowOrderRegister();
  const { mutateAsync: printGoodsFlow, isPending: isPrintPending } =
    useGoodsFlowPrint();
  const { mutateAsync: contractList, isPending: isContractListPending } =
    useGoodsFlowContractList();

  // 재발송 처리시에 사용
  const {
    mutateAsync: cancelGoodsFlowOrder,
    isPending: isCancelGoodsFlowPending,
  } = useGoodsFlowCancelOrder();

  // 모든 pending 상태를 하나로 통합
  const isPending =
    isConfirmPending ||
    isUnConfirmPending ||
    isRegisterDeliveryPending ||
    isCancelPending ||
    isForcedCompletePending ||
    isOtpPending ||
    isGoodsFlowRegisterPending ||
    isPrintPending ||
    isContractListPending ||
    isCancelGoodsFlowPending;

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
      setSelectedIds([]);
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

      confirmOrder(
        { orderType, body },
        {
          onSuccess: () => {
            addToast("주문확인 처리되었습니다.");
            setSelectedIds([]);
          },
          onError: () => {
            addToast("주문확인에 실패했습니다.");
          },
        }
      );
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
    if (invalid.length) {
      addToast("취소 가능 상태가 아닌 상품이 포함되어 있습니다");
      setSelectedIds([]);
      return;
    }

    if (!confirm(`선택하신 ${selectedIds.length}개를 확인취소 하시겠습니까?`))
      return;

    unConfirmOrder(
      { orderType, orderIdList: selectedIds },
      {
        onSuccess: () => {
          addToast("확인취소 처리되었습니다");
          setSelectedIds([]);
        },
        onError: () => {
          addToast("확인취소에 실패했습니다");
        },
      }
    );
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
      setSelectedIds([]);
      return;
    }

    // packageDelivery가 true인 항목이 있는지 체크
    const hasPackageDelivery = selectedItems.some(
      (item) => item.packageDelivery
    );

    if (hasPackageDelivery) {
      onDeliveryAlertToggle();
    } else {
      executeDelivery();
    }
  };

  // 실제 배송 처리 로직을 별도 함수로 분리
  const executeDelivery = async () => {
    try {
      // 3-1) BE: 배송정보 조회, BE에서 orderId만 이용해서 조회함
      const orderListReq = selectedIds.map((orderId) => ({
        orderId,
        selectOptionList: null,
      }));

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
      console.log("gfOrderRes", gfOrderRes);
      console.log("deliveryInfos", deliveryInfos);

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
      setSelectedIds([]);
    } catch (err: any) {
      addToast(`발송 처리 중 오류가 발생했습니다.\n${err.message || err}`);
    }
  };

  // AlertModal에서 확인 클릭 시
  const handleDeliveryConfirm = async () => {
    onDeliveryAlertClose();
    await executeDelivery();
  };

  // AlertModal에서 취소 클릭 시
  const handleDeliveryCancel = () => {
    onDeliveryAlertClose();
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
  const handleCancelConfirm = async () => {
    if (!cancelReason.trim()) {
      addToast("사유를 입력해주세요.");
      return;
    }

    try {
      let body: any;

      if (orderTypeReq === "GENERAL") {
        // GENERAL: orderItemIdList 생성
        const itemList: number[] = [];
        for (const orderId of selectedIds) {
          const detail = await getSalesDetailGeneral(orderId);
          detail.orderItemAndOptionDtoList.forEach((o) =>
            itemList.push(o.orderItemDto.orderItemId)
          );
        }
        body = {
          orderItemIdList: itemList,
          reason: CANCEL_REASON.cancelNowOfGeneralOrderBySeller,
          detailReason: cancelReason,
        };
      } else {
        // SUBSCRIBE: orderIdList 그대로
        body = {
          orderIdList: [...selectedIds],
          reason: CANCEL_REASON.cancelNowOfSubscribeOrderBySeller,
          detailReason: cancelReason,
        };
      }

      // 2-2) API 호출
      cancelOrderBySeller(
        { orderType, body },
        {
          onSuccess: () => {
            addToast("판매취소 처리되었습니다.");
            onCancelModalClose();
            setCancelReason("");
            setSelectedIds([]);
          },
          onError: (err: any) =>
            addToast(`판매취소에 실패했습니다.\n${err.message || err}`),
        }
      );
    } catch (err: any) {
      console.error(err);
      addToast(`판매취소 중 오류가 발생했습니다.\n${err.message || err}`);
    }
  };

  // 5) 굿스플로 택배사 관리
  const handleManage = async () => {
    try {
      const otp = await getOtp();
      const printRes = await contractList(otp);
      if (printRes) {
        openPopup(`/sales/delivery/print?data=${encodeURIComponent(printRes)}`);
      }
      setSelectedIds([]);
    } catch {
      addToast("굿스플로 호출 오류");
    }
  };

  // 6) 송장 재출력
  const handleReprintInvoice = async () => {
    if (!selectedIds.length) {
      addToast("선택된 상품이 없습니다.");
      return;
    }
    if (
      !window.confirm(
        `선택하신 ${selectedIds.length}개 송장을 재출력 하시겠습니까?`
      )
    ) {
      return;
    }

    try {
      // 6-1) BE: 배송정보 조회 — BE에서 orderId만 이용해서 조회함
      const orderListReq = selectedIds.map((orderId) => ({
        orderId,
        selectOptionList: null,
      }));
      const deliveryInfos = await registerDeliveryInfo({
        orderList: orderListReq,
      });

      // 6-2) GoodsFlow 기존 주문 취소
      for (const info of deliveryInfos) {
        const cancelRes = await cancelGoodsFlowOrder(info.transUniqueCd);
        if (!cancelRes.success) {
          console.error(`송장취소 실패: ${cancelRes.error?.message}`);
        }
      }

      // 6-2) GoodsFlow 기존 주문 취소
      for (const info of deliveryInfos) {
        const cancelRes = await cancelGoodsFlowOrder(info.transUniqueCd);
        if (!cancelRes.success) {
          console.error(`송장취소 실패: ${cancelRes.error?.message}`);
        }
      }

      // 6-3) GoodsFlow 재등록
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
          gfOrderRes.error?.message ?? "송장 재출력에 실패했습니다."
        );
      }

      // 6-4) 인쇄 팝업
      const otp = await getOtp();
      const printData = await printGoodsFlow({
        otp,
        id: gfOrderRes.id,
      });
      if (printData) {
        openPopup(
          `/sales/delivery/print?data=${encodeURIComponent(printData)}`
        );
      }

      setSelectedIds([]);
    } catch (err: any) {
      addToast(`송장 재출력 중 오류가 발생했습니다.\n${err.message || err}`);
    }
  };

  // 7) 일반 주문 상세 조회
  const handleDetail = async () => {
    if (selectedIds.length === 0) {
      addToast("주문을 선택해주세요");
      return;
    }

    if (orderType === "subscribe") {
      addToast("일반 주문 확인만 가능합니다");
      setSelectedIds([]);
      return;
    }
    try {
      const results: typeof detailData = [];

      for (const orderId of selectedIds) {
        const detail: SalesDetailGeneralResponse = await getSalesDetailGeneral(
          orderId
        );

        const { orderInfoDto, orderItemAndOptionDtoList, deliveryDto } = detail;
        const items: TableItem[] = [
          {
            label: "주문일시",
            value: format(parseISO(orderInfoDto.orderDate), "yyyy-MM-dd HH:mm"),
          },
          { label: "주문자", value: orderInfoDto.memberName },
          {
            label: "주소",
            value: `${deliveryDto.street} ${deliveryDto.detailAddress}`,
          },
          {
            label: "전화번호",
            value: deliveryDto.recipientPhone,
          },
        ];

        orderItemAndOptionDtoList.forEach(
          ({ orderItemDto, selectOptionDtoList }) => {
            items.push(
              { label: "상품명", value: orderItemDto.itemName },
              { label: "수량", value: orderItemDto.amount.toString() }
            );
            selectOptionDtoList.forEach((opt) =>
              items.push({
                label: `옵션`,
                value: `옵션명: ${
                  opt.optionName
                } / 수량: ${opt.amount.toString()}개`,
                fullWidth: true,
              })
            );
          }
        );

        results.push({
          orderId,
          items,
        });
      }

      setDetailData(results);
      onToggleDetailModal();
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      addToast("상세 조회 중 오류가 발생했습니다.");
    }
  };

  // 8) 강제 배송 완료
  const handleForcedDeliveryComplete = () => {
    if (selectedIds.length === 0) {
      addToast("주문을 선택해주세요");
      return;
    }

    if (
      !confirm(`선택하신 ${selectedIds.length}개를 강제 배송완료 하시겠습니까?`)
    )
      return;

    forcedDeliveryComplete(selectedIds, {
      onSuccess: () => {
        addToast("강제 배송완료 처리되었습니다");
        setSelectedIds([]);
      },
      onError: () => {
        addToast("강제 배송완료에 실패했습니다");
      },
    });
  };
  return {
    handleConfirm,
    handleDeny,
    handleDelivery,
    handleCancel,
    handleManage,
    handleReprintInvoice,

    //일반 주문 상세 모달
    handleDetail,
    detailData,
    isDetailModalOpen,
    onCloseDetailModal,

    // 판매 취소 모달
    isCancelModalOpen,
    handleCancelConfirm,
    cancelReason,
    setCancelReason,
    onCancelModalClose,
    handleForcedDeliveryComplete,

    // 배송 AlertModal
    isDeliveryAlertOpen,
    handleDeliveryConfirm,
    handleDeliveryCancel,

    // 로딩 상태
    isPending,
  };
}
