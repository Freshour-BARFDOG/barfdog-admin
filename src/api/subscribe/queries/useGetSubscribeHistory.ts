import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { getSubscribeHistory } from "../subscribe";
import {
  SubscribeHistoryListResponse,
  SubscribeHistoryParams,
} from "@/types/subscribe";

export function useGetSubscribeHistory(
  params: SubscribeHistoryParams,
  queryOptions?: UseQueryCustomOptions<SubscribeHistoryListResponse>
) {
  return useQuery<SubscribeHistoryListResponse>({
    queryKey: [
      queryKeys.SUBSCRIBE.BASE,
      queryKeys.SUBSCRIBE.GET_SUBSCRIBE_HISTORY,
      params,
    ],
    queryFn: () => getSubscribeHistory(params),
    keepPreviousData: true,
    ...queryOptions,
  });
}
