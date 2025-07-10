import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { RewardListResponse, RewardListSearchParams } from "@/types/benefits/rewards";
import { getRewardList } from "@/api/rewards/rewards";

export function useGetRewardList(
	page: number,
	searchParams: RewardListSearchParams,
	queryOptions?: UseQueryCustomOptions<RewardListResponse>,
) {
	return useQuery<RewardListResponse>({
		queryKey: [
			queryKeys.REWARDS.BASE,
			queryKeys.REWARDS.GET_REWARD_LIST,
			page,
			searchParams,
		],
		queryFn: () => getRewardList(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}