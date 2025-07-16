import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { getAllianceList } from "../products";
import { AllianceDto, GetAllianceListResponse } from "@/types/products";

export function useGetAllianceList(
  queryOptions?: UseQueryCustomOptions<GetAllianceListResponse[]>
) {
  return useQuery<GetAllianceListResponse[]>({
    queryKey: [queryKeys.PRODUCTS.BASE, queryKeys.PRODUCTS.GET_ALLIANCE_LIST],
    queryFn: () => getAllianceList(),
    ...queryOptions,
  });
}
