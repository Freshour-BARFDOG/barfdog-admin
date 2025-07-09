import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { createCoupon } from "@/api/coupons/coupons";
import { CreateCouponFormValues } from "@/types/benefits/coupons";

export function useCreateCoupon(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ body }: { body: CreateCouponFormValues }) => createCoupon(body),
		...mutationOptions,
	})
}
