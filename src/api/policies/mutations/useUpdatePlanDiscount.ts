import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { updatePlanDiscount } from "../policies";

export function useUpdatePlanDiscount(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlanDiscount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POLICIES.BASE,
          queryKeys.POLICIES.GET_PLAN_DISCOUNT,
        ],
      });
    },
    ...mutationOptions,
  });
}
