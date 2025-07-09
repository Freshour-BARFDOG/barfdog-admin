import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import {
	MemberCouponListBody,
	MemberCouponListResponse
} from "@/types/benefits/coupons";
import { getMemberCouponList } from "@/api/coupons/coupons";

export function useGetMemberCouponList(
	page: number,
	body: MemberCouponListBody,
	queryOptions?: UseQueryCustomOptions<MemberCouponListResponse>,
) {
	return useQuery<MemberCouponListResponse>({
		queryKey: [
			queryKeys.COUPONS.BASE,
			queryKeys.COUPONS.GET_MEMBER_COUPON_LIST,
			page,
			body,
		],
		queryFn: () => getMemberCouponList(page, body),
		keepPreviousData: true,
		...queryOptions,
	});
}