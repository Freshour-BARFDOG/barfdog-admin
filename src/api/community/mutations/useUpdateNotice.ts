import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { updateCommunity } from "@/api/community/community";
import { NoticeFormValues } from "@/types/community";

export function useUpdateNotice(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ body, noticeId }: {
			body: NoticeFormValues,
			noticeId: number,
		}) =>
			await updateCommunity('notices', body, noticeId),
		...mutationOptions,
	})
}
