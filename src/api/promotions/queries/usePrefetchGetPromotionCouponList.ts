import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { PromotionCouponListData } from "@/types/benefits/promotions";
import { getPromotionCouponList } from "@/api/promotions/promotions";

export async function prefetchGetPromotionCouponList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<PromotionCouponListData>({
		queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_COUPON_LIST],
		queryFn: () => getPromotionCouponList(ssrAxios as AxiosInstance),
	})
}