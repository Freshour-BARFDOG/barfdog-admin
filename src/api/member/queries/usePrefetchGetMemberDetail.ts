import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { MemberDetailData, MemberSubscriptionListResponse } from "@/types/member";
import { getMemberDetail, getMemberSubscriptionList } from "@/api/member/member";
import { AxiosInstance } from "axios";

export async function prefetchGetMemberDetail(memberId: number, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<MemberDetailData>({
		queryKey: [queryKeys.MEMBER.BASE, queryKeys.MEMBER.GET_MEMBER_DETAIL, memberId],
		queryFn: () => getMemberDetail(memberId, ssrAxios as AxiosInstance),
	})
}

export async function prefetchGetMemberSubscriptionList(memberId: number, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<MemberSubscriptionListResponse[]>({
		queryKey: [
			queryKeys.MEMBER.BASE,
			queryKeys.MEMBER.GET_MEMBER_DETAIL,
			memberId,
			queryKeys.MEMBER.GET_MEMBER_SUBSCRIPTION_LIST
		],
		queryFn: () => getMemberSubscriptionList(memberId, ssrAxios as AxiosInstance),
	})
}