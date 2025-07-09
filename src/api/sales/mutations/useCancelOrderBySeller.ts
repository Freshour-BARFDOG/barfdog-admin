import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderBySeller } from "../sales";
import { queryKeys } from "@/constants/queryKeys";

export function useCancelOrderBySeller(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrderBySeller,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SALES.BASE, queryKeys.SALES.GET_SEARCH],
      });
    },
    ...mutationOptions,
  });
}
