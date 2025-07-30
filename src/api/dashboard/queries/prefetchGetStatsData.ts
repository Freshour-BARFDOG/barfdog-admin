import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { STATS_INITIAL_SEARCH_VALUES } from "@/constants/dashboard";
import { StatsDataResponse } from "@/types/dashboard";
import { getStatsData } from "@/api/dashboard/dashboard";

export async function prefetchGetStatsData(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<StatsDataResponse>({
		queryKey: [queryKeys.DASHBOARD.BASE, queryKeys.DASHBOARD.GET_STATS_DATA, STATS_INITIAL_SEARCH_VALUES],
		queryFn: () => getStatsData(STATS_INITIAL_SEARCH_VALUES , ssrAxios as AxiosInstance),
	})
}