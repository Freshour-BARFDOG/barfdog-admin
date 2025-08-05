import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forcedDeliveryComplete } from "../sales";
import { queryKeys } from "@/constants/queryKeys";

export function useForcedDeliveryComplete(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: forcedDeliveryComplete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SALES.BASE, queryKeys.SALES.GET_SEARCH],
      });
    },
    ...mutationOptions,
  });
}
