import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { updateCouponInactive } from "@/api/coupons/coupons";

export function useUpdateCouponInactive(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ couponId }: { couponId: number }) => updateCouponInactive(couponId),
		...mutationOptions,
	})
}
