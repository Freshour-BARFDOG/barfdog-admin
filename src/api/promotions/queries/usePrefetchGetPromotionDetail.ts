import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { PromotionDetailData, PromotionMemberListResponse } from "@/types/benefits/promotions";
import { getPromotionDetail, getPromotionMemberList } from "@/api/promotions/promotions";
import { PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES } from "@/constants/benefits/promotions";

export async function prefetchGetPromotionDetail(promotionId: number, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<PromotionDetailData>({
		queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_DETAIL, promotionId],
		queryFn: () => getPromotionDetail(promotionId, ssrAxios as AxiosInstance),
	})
}

export async function prefetchGetPromotionMemberList(promotionId: number, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<PromotionMemberListResponse>({
		queryKey: [
			queryKeys.PROMOTIONS.BASE,
			queryKeys.PROMOTIONS.GET_PROMOTION_MEMBER_LIST,
			promotionId,
			0,
			PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES,
		],
		queryFn: () => getPromotionMemberList(promotionId, 0, PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}