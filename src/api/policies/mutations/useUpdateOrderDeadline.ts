import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { updateOrderDeadline } from "../policies";

export function useUpdateOrderDeadline(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderDeadline,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.POLICIES.BASE, queryKeys.POLICIES.GET_POLICIES],
      });
    },
    ...mutationOptions,
  });
}
