import { queryKeys } from "@/constants/queryKeys";
import { MemberListResponse, MemberListSearchParams } from "@/types/member";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getMemberList } from "@/api/member/member";
import { UseQueryCustomOptions } from "@/types/common";

export function useGetMemberList(
	page: number,
	searchParams: MemberListSearchParams,
	queryOptions?: UseQueryCustomOptions<MemberListResponse>,
) {
	return useQuery<MemberListResponse>({
		queryKey: [
			queryKeys.MEMBER.BASE,
			queryKeys.MEMBER.GET_MEMBER_LIST,
			page,
			searchParams,
		],
		queryFn: () => getMemberList(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}


export async function prefetchGetMemberList(queryClient: QueryClient, searchParams: MemberListSearchParams) {
	return queryClient.prefetchQuery<MemberListResponse>({
		queryKey: [
			queryKeys.MEMBER.BASE,
			queryKeys.MEMBER.GET_MEMBER_LIST,
			searchParams,
		] as const,
		queryFn: () => getMemberList(0, searchParams),
	})
}