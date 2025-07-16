import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteCommunity } from "@/api/community/community";
import { CommunityType } from "@/types/community";

export function useDeleteCommunity(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ type, id }: {
			type: CommunityType,
			id: number,
		}) =>
			await deleteCommunity(type, id),
		...mutationOptions,
	})
}
