import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { AllianceCouponDetailResponse } from "@/types/alliance";
import { getAllianceCouponDetail } from "@/api/alliance/alliance";

export async function prefetchAllianceCouponDetail(couponBundle: string, queryClient: QueryClient) {
  const ssrAxios = await createSSRRequest();
  await queryClient.prefetchQuery<AllianceCouponDetailResponse>({
    queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_COUPON_DETAIL, couponBundle],
    queryFn: () => getAllianceCouponDetail(couponBundle, ssrAxios as AxiosInstance),
  })
}