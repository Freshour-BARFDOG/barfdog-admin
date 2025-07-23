import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteAllianceEventIdList } from "@/api/alliance/alliance";

export function useDeleteAllianceEventList(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ allianceEventIdList }: {
			allianceEventIdList: number[],
		}) => deleteAllianceEventIdList(allianceEventIdList),
		...mutationOptions,
	})
}
