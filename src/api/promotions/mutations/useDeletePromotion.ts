import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deletePromotion } from "@/api/promotions/promotions";

export function useDeletePromotion(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ promotionId }: {
			promotionId: number,
		}) => deletePromotion(promotionId),
		...mutationOptions,
	})
}
