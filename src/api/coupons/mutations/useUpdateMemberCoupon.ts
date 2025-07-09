import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { updateMemberCoupon } from "@/api/coupons/coupons";
import { UpdateMemberCoupon } from "@/types/benefits/coupons";

export function useUpdateMemberCoupon(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ couponId, body }: { couponId: number, body: UpdateMemberCoupon }) => updateMemberCoupon(couponId, body),
		...mutationOptions,
	})
}
