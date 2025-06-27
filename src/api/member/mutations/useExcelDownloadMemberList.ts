import { useMutation } from "@tanstack/react-query";
import { excelDownloadMemberList } from "@/api/member/member";
import { UseMutationCustomOptions } from "@/types/common";
import { MemberListSearchParams } from "@/types/member";

export function useExcelDownloadMemberList(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (searchParams: MemberListSearchParams) => excelDownloadMemberList(searchParams),
		...mutationOptions,
	})
}
