import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { getAutoCoupons } from "../policies";
import { AutoCouponResponse } from "@/types/policies";

export function useGetAutoCoupons(
  queryOptions?: UseSuspenseQueryCustomOptions<AutoCouponResponse>
) {
  return useSuspenseQuery<AutoCouponResponse>({
    queryKey: [queryKeys.POLICIES.BASE, queryKeys.POLICIES.GET_AUTO_COUPONS],
    queryFn: () => getAutoCoupons(),
    ...queryOptions,
  });
}
