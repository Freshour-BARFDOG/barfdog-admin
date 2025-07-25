import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getPlanDiscount } from "../policies";
import { UseQueryCustomOptions } from "@/types/common";
import { PlanDiscountResponse } from "@/types/policies";

export function useGetPlanDiscount(
  queryOptions?: UseQueryCustomOptions<PlanDiscountResponse>
) {
  return useQuery({
    queryFn: () => getPlanDiscount(),
    queryKey: [queryKeys.POLICIES.BASE, queryKeys.POLICIES.GET_PLAN_DISCOUNT],
    ...queryOptions,
  });
}
