import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { createCommunity } from "@/api/community/community";
import { CreateArticleFormValues } from "@/types/community";

export function useCreateArticle(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ body }: {
			body: CreateArticleFormValues,
		}) =>
			await createCommunity('article', body),
		...mutationOptions,
	})
}
