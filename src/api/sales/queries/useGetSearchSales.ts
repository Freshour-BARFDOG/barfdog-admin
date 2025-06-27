import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { getSearchSales } from "../sales";
import { SearchSalesParams, SearchSalesResult } from "@/types/sales";
import { queryKeys } from "@/constants/queryKeys";

export function useGetSearchSales(
  params: SearchSalesParams,
  queryOptions?: UseQueryCustomOptions<SearchSalesResult>
) {
  return useQuery<SearchSalesResult>({
    queryKey: [queryKeys.SALES.BASE, queryKeys.SALES.GET_SEARCH, params],
    queryFn: () => getSearchSales(params),
    keepPreviousData: true,
    ...queryOptions,
  });
}
