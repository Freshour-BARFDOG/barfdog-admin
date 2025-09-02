import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { ProbiomeListParams, ProbiomeListResponse } from "@/types/diagnosis";
import { getProbiomeList } from "../diagnosis";

export function useGetProbiomeList(
  params: ProbiomeListParams,
  queryOptions?: UseQueryCustomOptions<ProbiomeListResponse>
) {
  return useQuery<ProbiomeListResponse>({
    queryKey: [queryKeys.DIAGNOSIS.BASE, queryKeys.DIAGNOSIS.GET_LIST, params],
    queryFn: () => getProbiomeList(params),
    keepPreviousData: true,
    ...queryOptions,
  });
}
