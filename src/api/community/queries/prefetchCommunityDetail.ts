import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";

const apiMap = {
  notices: (id: number, axios: any) => import("@/api/community/community").then(m => m.getNoticeDetail(id, axios)),
  events: (id: number, axios: any) => import("@/api/community/community").then(m => m.getEventDetail(id, axios)),
  article: (id: number, axios: any) => import("@/api/community/community").then(m => m.getArticleDetail(id, axios)),
};

const keyMap = {
  notices: queryKeys.COMMUNITY.GET_NOTICE_DETAIL,
  events: queryKeys.COMMUNITY.GET_EVENT_DETAIL,
  article: queryKeys.COMMUNITY.GET_ARTICLE_DETAIL,
};

export async function prefetchCommunityDetail<T>(
  type: keyof typeof apiMap,
  id: number,
  queryClient: QueryClient
) {
  const ssrAxios = await createSSRRequest();
  const apiFn = await apiMap[type];
  await queryClient.prefetchQuery<T>({
    queryKey: [queryKeys.COMMUNITY.BASE, keyMap[type], id],
    queryFn: () => apiFn(id, ssrAxios) as Promise<T>,
  });
}