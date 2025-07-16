import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { createCommunity } from "@/api/community/community";
import { CreateNoticeFormValues } from "@/types/community";

export function useCreateNotice(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ body }: {
			body: CreateNoticeFormValues,
		}) =>
			await createCommunity('notices', body),
		...mutationOptions,
	})
}
