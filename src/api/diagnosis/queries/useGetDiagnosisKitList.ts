import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { DiagnosisKitListResponse } from "@/types/diagnosis";
import { getDiagnosisKitList } from "../diagnosis";

interface PaginationParams {
  page: number;
  size: number;
}

export function useGetDiagnosisKitList(
  params: PaginationParams,
  queryOptions?: UseQueryCustomOptions<DiagnosisKitListResponse>
) {
  return useQuery<DiagnosisKitListResponse>({
    queryKey: [
      queryKeys.DIAGNOSIS.BASE,
      queryKeys.DIAGNOSIS.GET_KIT_LIST,
      params,
    ],
    queryFn: () => getDiagnosisKitList(params),
    keepPreviousData: true,
    ...queryOptions,
  });
}
