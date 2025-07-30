import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { getArticleDetail, getEventDetail, getNoticeDetail } from "../community";
import { queryKeys } from "@/constants/queryKeys";

const apiMap = {
  notices: getNoticeDetail,
  events: getEventDetail,
  article: getArticleDetail,
};

const keyMap = {
  notices: queryKeys.COMMUNITY.GET_NOTICE_DETAIL,
  events: queryKeys.COMMUNITY.GET_EVENT_DETAIL,
  article: queryKeys.COMMUNITY.GET_ARTICLE_DETAIL,
};

export function useGetCommunityDetail<T>(
  type: keyof typeof apiMap,
  id: number,
  queryOptions?: UseQueryCustomOptions<T>
) {
  return useQuery<T>({
    queryKey: [queryKeys.COMMUNITY.BASE, keyMap[type], id],
    queryFn: () => apiMap[type](id) as Promise<T>,
    keepPreviousData: true,
    ...queryOptions,
  });
}