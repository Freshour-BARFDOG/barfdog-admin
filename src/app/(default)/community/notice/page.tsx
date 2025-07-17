import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import NoticeList from "@/components/pages/community/notice/list/NoticeList";
import { prefetchCommunityList } from "@/api/community/queries/prefetchCommunityList";
import { queryKeys } from "@/constants/queryKeys";
import { PAGE_SIZE } from "@/constants/common";

export default async function NoticePage() {
  const queryClient = new QueryClient();
  await prefetchCommunityList({
    queryClient,
    queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_NOTICE_LIST, 0],
    type: 'notices',
    key: 'queryBlogsAdminDtoList',
    size: PAGE_SIZE.COMMUNITY.NOTICE,
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>공지사항 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='공지사항'>
            <NoticeList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
