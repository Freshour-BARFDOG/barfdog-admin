import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { createAlliance } from "@/api/alliance/alliance";
import { AllianceManagementFormValues } from "@/types/alliance";

export function useCreateAlliance(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ body }: {
			body: AllianceManagementFormValues,
		}) => createAlliance(body),
		...mutationOptions,
	})
}
