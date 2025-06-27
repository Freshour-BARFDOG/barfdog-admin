import { useMutation } from "@tanstack/react-query";
import { updateMemberAddress } from "@/api/member/member";
import { UseMutationCustomOptions } from "@/types/common";
import { AddressData } from "@/types/member";

export function useUpdateMemberAddress(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ memberId, address }: { memberId: number; address: AddressData }) => updateMemberAddress(memberId, { address}),
		...mutationOptions,
	})
}
