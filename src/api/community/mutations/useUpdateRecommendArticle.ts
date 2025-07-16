import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { updateRecommendArticle } from "@/api/community/community";
import { RecommendArticleBody } from "@/types/community";

export function useUpdateRecommendArticle(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ body }: { body: RecommendArticleBody }) =>
			await updateRecommendArticle(body),
		...mutationOptions,
	})
}
