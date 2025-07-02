import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unConfirmOrder } from "../sales";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";

export function useUnConfirmOrder(mutationOptions?: UseMutationCustomOptions) {
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unConfirmOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SALES.BASE, queryKeys.SALES.GET_SEARCH],
      });
      addToast("확인취소 처리되었습니다");
    },
    onError: () => {
      addToast("확인취소에 실패했습니다");
    },
    ...mutationOptions,
  });
}
