import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { PromotionListResponse, PromotionListSearchParams } from "@/types/benefits/promotions";
import { getPromotionList } from "@/api/promotions/promotions";

export function useGetPromotionList(
	page: number,
	searchParams: PromotionListSearchParams,
	queryOptions?: UseQueryCustomOptions<PromotionListResponse>,
) {
	return useQuery<PromotionListResponse>({
		queryKey: [
			queryKeys.PROMOTIONS.BASE,
			queryKeys.PROMOTIONS.GET_PROMOTION_LIST,
			page,
			searchParams,
		],
		queryFn: () => getPromotionList(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}