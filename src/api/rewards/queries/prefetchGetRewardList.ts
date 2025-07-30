import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { REWARD_LIST_INITIAL_SEARCH_VALUES } from "@/constants/benefits/rewards";
import { RewardListResponse } from "@/types/benefits/rewards";
import { getRewardList } from "@/api/rewards/rewards";

export async function prefetchGetRewardList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<RewardListResponse>({
		queryKey: [queryKeys.REWARDS.BASE, queryKeys.REWARDS.GET_REWARD_LIST, 0, REWARD_LIST_INITIAL_SEARCH_VALUES],
		queryFn: () => getRewardList(0, REWARD_LIST_INITIAL_SEARCH_VALUES , ssrAxios as AxiosInstance),
	})
}