import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { SubscribeDetailResponse } from "@/types/subscribe";
import { getSubscribeDetail } from "../subscribe";
import { UseSuspenseQueryCustomOptions } from "@/types/common";

function useGetSubscribeDetail(
  subscribeId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SubscribeDetailResponse>
) {
  return useSuspenseQuery<SubscribeDetailResponse>({
    queryKey: [
      queryKeys.SUBSCRIBE.BASE,
      queryKeys.SUBSCRIBE.GET_SUBSCRIBE_DETAIL,
      subscribeId,
    ],
    queryFn: () => getSubscribeDetail(subscribeId),
    ...queryOptions,
  });
}

export { useGetSubscribeDetail };
