import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { SelectOption, UseQueryCustomOptions } from "@/types/common";
import { getPromotionCouponList } from "@/api/promotions/promotions";

export function useGetPromotionCouponList(queryOptions?: UseQueryCustomOptions<SelectOption<number>[]>) {
	return useQuery<SelectOption<number>[]>({
		queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_COUPON_LIST],
		queryFn: () => getPromotionCouponList(),
		...queryOptions,
	});
}