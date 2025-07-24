import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { AllianceCouponDetailResponse } from "@/types/alliance";
import { getAllianceCouponDetail } from "@/api/alliance/alliance";

export function useGetAllianceCouponDetail(
	couponBundle: string,
	queryOptions?: UseQueryCustomOptions<AllianceCouponDetailResponse>,
) {
	return useQuery<AllianceCouponDetailResponse>({
		queryKey: [
			queryKeys.ALLIANCE.BASE,
			queryKeys.ALLIANCE.GET_ALLIANCE_COUPON_DETAIL,
			couponBundle,
		],
		queryFn: () => getAllianceCouponDetail(couponBundle),
		keepPreviousData: true,
		...queryOptions,
	});
}
