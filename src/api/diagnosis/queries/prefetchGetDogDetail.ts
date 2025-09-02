import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { getProbiomeDetail } from "../diagnosis";
import { ProbiomeDetailResponse } from "@/types/diagnosis";

export async function prefetchGetProbiomeDetail(
  diagnosisId: number,
  queryClient: QueryClient
) {
  const ssrAxios = await createSSRRequest();
  await queryClient.prefetchQuery<ProbiomeDetailResponse>({
    queryKey: [
      queryKeys.DIAGNOSIS.BASE,
      queryKeys.DIAGNOSIS.GET_PROBIOME_DETAIL,
      diagnosisId,
    ],
    queryFn: () => getProbiomeDetail(diagnosisId, ssrAxios as AxiosInstance),
  });
}
