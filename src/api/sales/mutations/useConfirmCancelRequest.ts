import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmCancelRequest, confirmOrder } from "../sales";
import { queryKeys } from "@/constants/queryKeys";

export function useConfirmCancelRequest(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmCancelRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SALES.BASE, queryKeys.SALES.GET_SEARCH],
      });
    },
    ...mutationOptions,
  });
}
