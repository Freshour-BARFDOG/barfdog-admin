import { useMutation } from "@tanstack/react-query";
import { updateMemberGrade } from "@/api/member/member";
import { UseMutationCustomOptions } from "@/types/common";

export function useUpdateMemberGrade(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ memberId, grade }: { memberId: number; grade: string }) => updateMemberGrade(memberId, { grade }),
		...mutationOptions,
	})
}
