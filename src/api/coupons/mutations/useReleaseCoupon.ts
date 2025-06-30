import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { releaseCoupon } from "@/api/coupons/coupons";
import { ReleaseCouponRequestBody, ReleaseCouponTarget } from "@/types/coupons";

export function useReleaseCoupon(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ couponTarget, body }: {
			couponTarget: ReleaseCouponTarget,
			body: ReleaseCouponRequestBody
		}) => releaseCoupon(couponTarget, body),
		...mutationOptions,
	})
}
