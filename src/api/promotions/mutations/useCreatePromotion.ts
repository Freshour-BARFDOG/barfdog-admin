import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { PromotionFormValues } from "@/types/benefits/promotions";
import { createPromotion } from "@/api/promotions/promotions";

export function useCreatePromotion(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ body }: {
			body: PromotionFormValues
		}) => createPromotion(body),
		...mutationOptions,
	})
}
