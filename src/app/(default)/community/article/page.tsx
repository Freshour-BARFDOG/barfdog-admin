import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import ArticleList from "@/components/pages/community/article/list/ArticleList";
import { prefetchGetCommunityList } from "@/api/community/queries/usePrefetchGetCommunityList";
import { queryKeys } from "@/constants/queryKeys";
import { PAGE_SIZE } from "@/constants/common";

export default async function ArticlePage() {
  const queryClient = new QueryClient();
  await prefetchGetCommunityList({
    queryClient,
    queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_ARTICLE_LIST, 0],
    type: 'article',
    key: 'queryBlogsAdminDtoList',
    size: PAGE_SIZE.COMMUNITY.ARTICLE,
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>아티클 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='아티클'>
            <ArticleList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
