import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { MemberListResponse } from "@/types/member";
import { getMemberList } from "@/api/member/member";
import { AxiosInstance } from "axios";
import { INITIAL_SEARCH_VALUES } from "@/constants/member";

export async function prefetchGetMemberList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<MemberListResponse>({
		queryKey: [queryKeys.MEMBER.BASE, queryKeys.MEMBER.GET_MEMBER_LIST, 0, INITIAL_SEARCH_VALUES],
		queryFn: () => getMemberList(0, INITIAL_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}