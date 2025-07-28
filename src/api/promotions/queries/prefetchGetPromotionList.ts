import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { PromotionListResponse } from "@/types/benefits/promotions";
import { PROMOTION_LIST_INITIAL_SEARCH_VALUES } from "@/constants/benefits/promotions";
import { getPromotionList } from "@/api/promotions/promotions";

export async function prefetchGetPromotionList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<PromotionListResponse>({
		queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_LIST, 0, PROMOTION_LIST_INITIAL_SEARCH_VALUES],
		queryFn: () => getPromotionList(0, PROMOTION_LIST_INITIAL_SEARCH_VALUES , ssrAxios as AxiosInstance),
	})
}