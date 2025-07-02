import { useSuspenseQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { getTraceResults } from "../goodsflow";

export function useGetSalesDetailSubscribe(
  queryOptions?: UseSuspenseQueryCustomOptions<any>
) {
  return useSuspenseQuery<any>({
    queryKey: [queryKeys.GOODSFLOW.BASE, queryKeys.GOODSFLOW.GET_TRACE_RESULTS],
    queryFn: () => getTraceResults(),
    ...queryOptions,
  });
}
