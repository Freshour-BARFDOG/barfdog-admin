import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { searchOrders } from "../orders";
import { SearchOrdersParams, SearchOrdersResult } from "@/types/orders";
import { queryKeys } from "@/constants/queryKeys";

export function useSearchOrders(
  params: SearchOrdersParams,
  queryOptions?: UseQueryCustomOptions<SearchOrdersResult>
) {
  return useQuery<SearchOrdersResult>({
    queryKey: [queryKeys.ORDERS.BASE, queryKeys.ORDERS.SEARCH_ORDERS, params],
    queryFn: () => searchOrders(params),
    keepPreviousData: true,
    ...queryOptions,
  });
}
