import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { createAllianceEvent } from "@/api/alliance/alliance";
import { CreateAllianceEvent } from "@/types/alliance";

export function useCreateAllianceEvent(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ body }: {
			body: CreateAllianceEvent,
		}) => createAllianceEvent(body),
		...mutationOptions,
	})
}
