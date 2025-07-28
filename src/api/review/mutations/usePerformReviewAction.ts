import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { ReviewActionType } from "@/types/review";
import { performReviewAction } from "@/api/review/review";

export function usePerformReviewAction(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ action, payload  }: {
			action: ReviewActionType,
			payload: any,
		}) => performReviewAction(action, payload),
		...mutationOptions,
	})
}
