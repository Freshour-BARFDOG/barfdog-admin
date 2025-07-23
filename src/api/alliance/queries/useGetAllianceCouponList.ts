import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import {
	AllianceCouponListSearchParams, AllianceCouponListResponse,
} from "@/types/alliance";
import { getAllianceCouponList } from "@/api/alliance/alliance";

export function useGetAllianceCouponList(
	page: number,
	searchParams: AllianceCouponListSearchParams,
	queryOptions?: UseQueryCustomOptions<AllianceCouponListResponse>,
) {
	return useQuery<AllianceCouponListResponse>({
		queryKey: [
			queryKeys.ALLIANCE.BASE,
			queryKeys.ALLIANCE.GET_ALLIANCE_COUPON_LIST,
			page,
			searchParams,
		],
		queryFn: () => getAllianceCouponList(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}
