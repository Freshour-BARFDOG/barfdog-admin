import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { CouponListResponse, CouponListSearchParams } from "@/types/coupons";
import { getCouponList } from "@/api/coupons/coupons";

export function useGetCouponList(
	page: number,
	searchParams: CouponListSearchParams,
	queryOptions?: UseQueryCustomOptions<CouponListResponse>,
) {
	return useQuery<CouponListResponse>({
		queryKey: [
			queryKeys.COUPONS.BASE,
			queryKeys.COUPONS.GET_COUPON_LIST,
			page,
			searchParams,
		],
		queryFn: () => getCouponList(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}