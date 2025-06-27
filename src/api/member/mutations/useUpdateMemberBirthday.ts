import { useMutation } from "@tanstack/react-query";
import { updateMemberBirthday } from "@/api/member/member";
import { UseMutationCustomOptions } from "@/types/common";

export function useUpdateMemberBirthday(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ memberId, birthday }: { memberId: number; birthday: string }) => updateMemberBirthday(memberId, { birthday }),
		...mutationOptions,
	})
}
