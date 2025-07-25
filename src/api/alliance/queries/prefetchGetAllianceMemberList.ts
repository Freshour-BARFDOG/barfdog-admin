import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { INITIAL_SEARCH_VALUES } from "@/constants/member";
import { AllianceMemberListResponse } from "@/types/alliance";
import { getAllianceMemberList } from "@/api/alliance/alliance";

export async function prefetchGetAllianceMemberList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<AllianceMemberListResponse>({
		queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_MEMBER_LIST, 0, INITIAL_SEARCH_VALUES],
		queryFn: () => getAllianceMemberList(0, INITIAL_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}