import { useSuspenseQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { getSalesDetailSubscribe } from "../sales";
import { queryKeys } from "@/constants/queryKeys";
import { SalesDetailSubscribeResponse } from "@/types/sales";

export function useGetSalesDetailSubscribe(
  orderId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SalesDetailSubscribeResponse>
) {
  return useSuspenseQuery<SalesDetailSubscribeResponse>({
    queryKey: [
      queryKeys.SALES.BASE,
      queryKeys.SALES.GET_DETAIL_GENERAL,
      orderId,
    ],
    queryFn: () => getSalesDetailSubscribe(orderId),
    ...queryOptions,
  });
}
