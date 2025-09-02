import { useSuspenseQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { ProbiomeDetailResponse } from "@/types/diagnosis";
import { getProbiomeDetail } from "../diagnosis";

export function useGetProbiomeDetail(
  diagnosisId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<ProbiomeDetailResponse>
) {
  return useSuspenseQuery<ProbiomeDetailResponse>({
    queryKey: [
      queryKeys.DIAGNOSIS.BASE,
      queryKeys.DIAGNOSIS.GET_PROBIOME_DETAIL,
      diagnosisId,
    ],
    queryFn: () => getProbiomeDetail(diagnosisId),
    keepPreviousData: true,
    ...queryOptions,
  });
}
