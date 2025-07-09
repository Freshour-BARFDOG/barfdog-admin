import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { COUPON_LIST_INITIAL_SEARCH_VALUES } from "@/constants/benefits/coupons";
import { getCouponList } from "@/api/coupons/coupons";
import { CouponListResponse } from "@/types/benefits/coupons";

export async function prefetchGetCouponList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<CouponListResponse>({
		queryKey: [queryKeys.COUPONS.BASE, queryKeys.COUPONS.GET_COUPON_LIST, 0, COUPON_LIST_INITIAL_SEARCH_VALUES],
		queryFn: () => getCouponList(0, COUPON_LIST_INITIAL_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}