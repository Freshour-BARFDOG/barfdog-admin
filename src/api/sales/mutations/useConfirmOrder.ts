import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmOrder } from "../sales";
import { queryKeys } from "@/constants/queryKeys";

export function useConfirmOrder(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SALES.BASE, queryKeys.SALES.GET_SEARCH],
      });
    },
    ...mutationOptions,
  });
}
