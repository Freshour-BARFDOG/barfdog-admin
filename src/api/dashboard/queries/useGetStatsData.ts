import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { StatsDataResponse, StatsSearchParams } from "@/types/dashboard";
import { getStatsData } from "@/api/dashboard/dashboard";

export function useGetStatsData(
	searchParams: StatsSearchParams,
	queryOptions?: UseQueryCustomOptions<StatsDataResponse>,
) {
	return useQuery<StatsDataResponse>({
		queryKey: [
			queryKeys.DASHBOARD.BASE,
			queryKeys.DASHBOARD.GET_STATS_DATA,
			searchParams,
		],
		queryFn: () => getStatsData(searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}