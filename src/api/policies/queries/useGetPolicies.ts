import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { getPolicies } from "../policies";
import { PolicySettingsResponse } from "@/types/policies";

export function useGetPolicies(
  queryOptions?: UseSuspenseQueryCustomOptions<PolicySettingsResponse>
) {
  return useSuspenseQuery<PolicySettingsResponse>({
    queryKey: [queryKeys.POLICIES.BASE, queryKeys.POLICIES.GET_POLICIES],
    queryFn: () => getPolicies(),
    ...queryOptions,
  });
}
