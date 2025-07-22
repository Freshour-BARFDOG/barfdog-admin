import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { AllianceDetailResponse } from "@/types/alliance";
import { getAllianceDetail } from "@/api/alliance/alliance";

export async function prefetchAllianceDetail(allianceId: number, queryClient: QueryClient) {
  const ssrAxios = await createSSRRequest();
  await queryClient.prefetchQuery<AllianceDetailResponse>({
    queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_DETAIL, allianceId],
    queryFn: () => getAllianceDetail(allianceId, ssrAxios as AxiosInstance),
  })
}