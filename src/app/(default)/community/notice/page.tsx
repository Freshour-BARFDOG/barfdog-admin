import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import NoticeList from "@/components/pages/community/notice/list/NoticeList";
import { prefetchGetNoticeList } from "@/api/community/queries/usePrefetchGetNoticeList";

export default async function NoticePage() {
  const queryClient = new QueryClient();
  await prefetchGetNoticeList(queryClient);
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
