import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { updateCommunity } from "@/api/community/community";
import { ArticleFormValues } from "@/types/community";

export function useUpdateArticle(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ body, articleId }: {
			body: ArticleFormValues,
			articleId: number,
		}) =>
			await updateCommunity('article', body, articleId),
		...mutationOptions,
	})
}
