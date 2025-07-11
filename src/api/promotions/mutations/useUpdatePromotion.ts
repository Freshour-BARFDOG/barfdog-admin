import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { PromotionFormValues } from "@/types/benefits/promotions";
import { updatePromotion } from "@/api/promotions/promotions";

export function useUpdatePromotion(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ promotionId, body }: {
			promotionId: number,
			body: PromotionFormValues
		}) => updatePromotion(promotionId, body),
		...mutationOptions,
	})
}
