import { useSuspenseQuery } from "@tanstack/react-query";
import { MemberDetailData, MemberSubscriptionListResponse } from "@/types/member";
import { getMemberDetail, getMemberSubscriptionList } from "@/api/member/member";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";

export function useGetMemberDetail(memberId: number, queryOptions?: UseSuspenseQueryCustomOptions<MemberDetailData>) {
	return useSuspenseQuery<MemberDetailData>({
		queryKey: [queryKeys.MEMBER.BASE, queryKeys.MEMBER.GET_MEMBER_DETAIL, memberId],
		queryFn: () => getMemberDetail(memberId),
		...queryOptions,
	})
}

export function useGetMemberSubscriptionList(memberId: number, queryOptions?: UseSuspenseQueryCustomOptions<MemberSubscriptionListResponse[]>) {
	return useSuspenseQuery<MemberSubscriptionListResponse[]>({
		queryKey: [
			queryKeys.MEMBER.BASE,
			queryKeys.MEMBER.GET_MEMBER_DETAIL,
			memberId,
			queryKeys.MEMBER.GET_MEMBER_SUBSCRIPTION_LIST
		],
		queryFn: () => getMemberSubscriptionList(memberId),
		...queryOptions,
	})
}