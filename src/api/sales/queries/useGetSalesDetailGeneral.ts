import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { getSalesDetailGeneral } from "../sales";
import { SalesDetailGeneralResponse } from "@/types/sales";
import { queryKeys } from "@/constants/queryKeys";

export function useGetSalesDetailGeneral(
  orderId: number,
  queryOptions?: UseQueryCustomOptions<SalesDetailGeneralResponse>
) {
  return useQuery<SalesDetailGeneralResponse>({
    queryKey: [
      queryKeys.SALES.BASE,
      queryKeys.SALES.GET_DETAIL_GENERAL,
      orderId,
    ],
    queryFn: () => getSalesDetailGeneral(orderId),
    ...queryOptions,
  });
}
