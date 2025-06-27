import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { MemberSubscriptionListResponse } from "@/types/member";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getMemberSubscriptionList } from "@/api/member/member";

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