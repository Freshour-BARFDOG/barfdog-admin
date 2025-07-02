import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmOrder } from "../sales";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";

export function useConfirmOrder(mutationOptions?: UseMutationCustomOptions) {
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SALES.BASE, queryKeys.SALES.GET_SEARCH],
      });
      addToast("주문확인 처리되었습니다.");
    },
    onError: () => {
      addToast("주문확인에 실패했습니다.");
    },
    ...mutationOptions,
  });
}
