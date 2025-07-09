import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unConfirmOrder } from "../sales";
import { queryKeys } from "@/constants/queryKeys";

export function useUnConfirmOrder(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unConfirmOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SALES.BASE, queryKeys.SALES.GET_SEARCH],
      });
    },
    ...mutationOptions,
  });
}
