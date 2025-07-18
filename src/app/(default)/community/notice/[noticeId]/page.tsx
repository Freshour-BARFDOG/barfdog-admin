import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import NoticeDetail from "@/components/pages/community/notice/detail/NoticeDetail";
import { prefetchCommunityDetail } from "@/api/community/queries/prefetchCommunityDetail";

interface UpdateNoticePageProps {
  params: {
    noticeId: string;
  }
}

export default async function NoticeDetailPage({ params }: UpdateNoticePageProps) {
  const noticeId = Number(params.noticeId);

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
