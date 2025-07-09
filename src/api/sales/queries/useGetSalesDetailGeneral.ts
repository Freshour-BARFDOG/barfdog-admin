import { useSuspenseQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { getSalesDetailGeneral } from "../sales";
import { SalesDetailGeneralResponse } from "@/types/sales";
import { queryKeys } from "@/constants/queryKeys";

export function useGetSalesDetailGeneral(
  orderId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SalesDetailGeneralResponse>
) {
  return useSuspenseQuery<SalesDetailGeneralResponse>({
    queryKey: [
      queryKeys.SALES.BASE,
      queryKeys.SALES.GET_DETAIL_GENERAL,
      orderId,
    ],
    queryFn: () => getSalesDetailGeneral(orderId),
    ...queryOptions,
  });
}
