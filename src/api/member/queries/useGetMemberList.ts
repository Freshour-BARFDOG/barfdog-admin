import { queryKeys } from "@/constants/queryKeys";
import { MemberListResponse, MemberListSearchParams } from "@/types/member";
import { useQuery } from "@tanstack/react-query";
import { getMemberList } from "@/api/member/member";
import { UseQueryCustomOptions } from "@/types/common";

export function useGetMemberList(
	page: number,
	searchParams: MemberListSearchParams,
	size: number = 10,
	queryOptions?: UseQueryCustomOptions<MemberListResponse>,
) {
	return useQuery<MemberListResponse>({
		queryKey: [
			queryKeys.MEMBER.BASE,
			queryKeys.MEMBER.GET_MEMBER_LIST,
			page,
			searchParams,
			size,
		],
		queryFn: () => getMemberList(page, searchParams, size),
		keepPreviousData: true,
		...queryOptions,
	});
}