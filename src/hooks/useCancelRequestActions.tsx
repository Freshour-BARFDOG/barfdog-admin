import { Dispatch, SetStateAction } from "react";
import { OrderTypeResponse, OrderTypeRequest } from "@/types/sales";
import { useToastStore } from "@/store/useToastStore";
import { useConfirmCancelRequest } from "@/api/sales/mutations/useConfirmCancelRequest";
import { useRejectCancelRequest } from "@/api/sales/mutations/useRejectCancelRequest";

export function useCancelRequestActions(
  selectedIds: number[],
  setSelectedIds: Dispatch<SetStateAction<number[]>>,
  orderTypeReq: OrderTypeRequest
) {
  const { addToast } = useToastStore();

  const { mutate: confirmRequest } = useConfirmCancelRequest();
  const { mutate: rejectRequest } = useRejectCancelRequest();

  const orderType =
    orderTypeReq === "GENERAL"
      ? "general"
      : orderTypeReq === "SUBSCRIBE"
      ? "subscribe"
      : (null as any as OrderTypeResponse);

  // 1) 취소 승인
  const handleConfirmRequest = () => {
    if (!selectedIds.length) return addToast("선택된 상품이 없습니다");

    if (
      !confirm(
        `선택하신 ${selectedIds.length}개의 취소요청을 승인 하시겠습니까?`
      )
    )
      return;

    confirmRequest(
      { orderIdList: selectedIds, orderType },
      {
        onSuccess: () => {
          addToast("취소 요청이 승인되었습니다");
          setSelectedIds([]);
        },
        onError: () => {
          addToast("취소 요청에 실패했습니다.");
        },
      }
    );
  };

  // 2) 취소 반려
  const handleRejectRequest = () => {
    if (!selectedIds.length) return addToast("선택된 상품이 없습니다");

    if (
      !confirm(
        `선택하신 ${selectedIds.length}개의 취소요청을 반려하시겠습니까?`
      )
    )
      return;

    rejectRequest(selectedIds, {
      onSuccess: () => {
        addToast("취소 요청이 반려되었습니다");
        setSelectedIds([]);
      },
      onError: () => {
        addToast("취소 요청 반려에 실패했습니다.");
      },
    });
  };

  return {
    handleConfirmRequest,
    handleRejectRequest,
  };
}
