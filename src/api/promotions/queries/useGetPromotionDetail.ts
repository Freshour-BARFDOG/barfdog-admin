import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions, UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import {
	PromotionDetailData,
	PromotionMemberListResponse, PromotionMemberListSearchParams
} from "@/types/benefits/promotions";
import { getPromotionDetail, getPromotionMemberList } from "@/api/promotions/promotions";

export function useGetPromotionDetail(promotionId: number, queryOptions?: UseSuspenseQueryCustomOptions<PromotionDetailData>) {
	return useSuspenseQuery<PromotionDetailData>({
		queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_DETAIL, promotionId],
		queryFn: () => getPromotionDetail(promotionId),
		...queryOptions,
	})
}

export function useGetPromotionMemberList(
	promotionId: number,
	page: number,
	searchParams: PromotionMemberListSearchParams,
	queryOptions?: UseQueryCustomOptions<PromotionMemberListResponse>,
) {
	return useQuery<PromotionMemberListResponse>({
		queryKey: [
			queryKeys.PROMOTIONS.BASE,
			queryKeys.PROMOTIONS.GET_PROMOTION_MEMBER_LIST,
			promotionId,
			page,
			searchParams,
		],
		queryFn: () => getPromotionMemberList(promotionId, page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}
