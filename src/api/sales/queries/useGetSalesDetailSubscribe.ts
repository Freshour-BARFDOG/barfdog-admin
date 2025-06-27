import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { getSalesDetailSubscribe } from "../sales";
import { queryKeys } from "@/constants/queryKeys";
import { SalesDetailSubscribeResponse } from "@/types/sales";

export function useGetSalesDetailSubscribe(
  orderId: number,
  queryOptions?: UseQueryCustomOptions<SalesDetailSubscribeResponse>
) {
  return useQuery<any>({
    queryKey: [
      queryKeys.SALES.BASE,
      queryKeys.SALES.GET_DETAIL_GENERAL,
      orderId,
    ],
    queryFn: () => getSalesDetailSubscribe(orderId),
    ...queryOptions,
  });
}
