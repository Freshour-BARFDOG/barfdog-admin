import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteAllianceIdList } from "@/api/alliance/alliance";

export function useDeleteAllianceEventList(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ allianceIdList }: {
			allianceIdList: number[],
		}) => deleteAllianceIdList(allianceIdList),
		...mutationOptions,
	})
}
