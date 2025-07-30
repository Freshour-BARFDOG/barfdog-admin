import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { updateDeliveryFeePolicy } from "../policies";

export function useUpdateDeliveryFeePolicy(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDeliveryFeePolicy,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.POLICIES.BASE, queryKeys.POLICIES.GET_POLICIES],
      });
    },
    ...mutationOptions,
  });
}
