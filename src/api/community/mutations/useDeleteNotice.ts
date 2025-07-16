import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteCommunity } from "@/api/community/community";

export function useDeleteNotice(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ noticeId }: {
			noticeId: number,
		}) =>
			await deleteCommunity('notices', noticeId),
		...mutationOptions,
	})
}
