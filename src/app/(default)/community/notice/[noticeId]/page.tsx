import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import NoticeDetail from "@/components/pages/community/notice/detail/NoticeDetail";
import { prefetchCommunityDetail } from "@/api/community/queries/prefetchCommunityDetail";
import { PageProps } from "@/types/common";

export const metadata = {
  title: '관리자 | 공지사항 상세',
};

type Params = { noticeId: string };

export default async function NoticeDetailPage({ params }: PageProps<Params>) {
  const resolvedParams = await params;
  const noticeId = Number(resolvedParams.noticeId);

  const queryClient = new QueryClient();
  await prefetchCommunityDetail('notices', noticeId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>공지사항 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='공지사항 수정'>
            <NoticeDetail noticeId={noticeId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
