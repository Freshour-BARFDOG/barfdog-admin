import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { MEMBER_COUPON_LIST_INITIAL_SEARCH_VALUES } from "@/constants/coupons";
import { getMemberCouponList } from "@/api/coupons/coupons";
import { MemberCouponListResponse } from "@/types/coupons";

export async function prefetchGetMemberCouponList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<MemberCouponListResponse>({
		queryKey: [queryKeys.COUPONS.BASE, queryKeys.COUPONS.GET_MEMBER_COUPON_LIST, 0, MEMBER_COUPON_LIST_INITIAL_SEARCH_VALUES],
		queryFn: () => getMemberCouponList(0, MEMBER_COUPON_LIST_INITIAL_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}