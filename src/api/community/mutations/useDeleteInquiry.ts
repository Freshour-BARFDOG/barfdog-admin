import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteInquiry } from "@/api/community/community";

export function useDeleteInquiry(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ id }: {
			id: number,
		}) =>
			await deleteInquiry(id),
		...mutationOptions,
	})
}
