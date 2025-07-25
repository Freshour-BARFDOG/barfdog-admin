import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { updateCouponPolicy } from "../policies";

export function useUpdateCouponPolicy(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCouponPolicy,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POLICIES.BASE,
          queryKeys.POLICIES.GET_AUTO_COUPONS,
        ],
      });
    },
    ...mutationOptions,
  });
}
