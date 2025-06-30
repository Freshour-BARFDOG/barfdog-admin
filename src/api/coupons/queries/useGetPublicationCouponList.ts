import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import {
	PublicationCouponListData,
	ReleaseCouponType
} from "@/types/coupons";
import { getPublicationCouponList } from "@/api/coupons/coupons";

export function useGetPublicationCouponList(
	couponType: ReleaseCouponType,
	queryOptions?: UseQueryCustomOptions<PublicationCouponListData[]>
) {
	return useQuery<PublicationCouponListData[]>({
		queryKey: [
			queryKeys.COUPONS.BASE,
			queryKeys.COUPONS.GET_PUBLICATION_COUPON_LIST,
			couponType,
		],
		queryFn: () => getPublicationCouponList(couponType),
		...queryOptions,
	});
}