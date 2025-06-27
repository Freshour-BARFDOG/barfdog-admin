import { useSuspenseQuery } from "@tanstack/react-query";
import { MemberDetailData } from "@/types/member";
import { getMemberDetail } from "@/api/member/member";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";

export function useGetMemberDetail(memberId: number, queryOptions?: UseSuspenseQueryCustomOptions<MemberDetailData>) {
	return useSuspenseQuery<MemberDetailData>({
		queryKey: [queryKeys.MEMBER.BASE, queryKeys.MEMBER.GET_MEMBER_DETAIL, memberId],
		queryFn: () => getMemberDetail(memberId),
		...queryOptions,
	})
}