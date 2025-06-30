import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { getPublicationCouponList } from "@/api/coupons/coupons";
import { PublicationCouponListData } from "@/types/coupons";

export async function prefetchGetPublicationCouponList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<PublicationCouponListData[]>({
		queryKey: [
			queryKeys.COUPONS.BASE,
			queryKeys.COUPONS.GET_PUBLICATION_COUPON_LIST,
			'CODE_PUBLISHED',
		],
		queryFn: () => getPublicationCouponList('CODE_PUBLISHED', ssrAxios),
	})
}