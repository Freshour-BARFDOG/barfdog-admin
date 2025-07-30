import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { INITIAL_COUPON_SEARCH_VALUES } from "@/constants/alliance";
import { AllianceCouponListResponse } from "@/types/alliance";
import { getAllianceCouponList } from "@/api/alliance/alliance";

export async function prefetchGetAllianceCouponList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<AllianceCouponListResponse>({
		queryKey: [
			queryKeys.ALLIANCE.BASE,
			queryKeys.ALLIANCE.GET_ALLIANCE_COUPON_LIST,
			0,
			INITIAL_COUPON_SEARCH_VALUES
		],
		queryFn: () => getAllianceCouponList(0, INITIAL_COUPON_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}