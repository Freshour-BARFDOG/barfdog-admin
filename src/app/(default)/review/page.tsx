import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import ReviewList from "@/components/pages/review/list/reviewList/ReviewList";
import { prefetchGetReviewList } from "@/api/review/queries/prefetchGetReviewList";

export const metadata = {
  title: '관리자 | 리뷰',
};

export default async function ReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetReviewList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>리뷰 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='리뷰 조회'>
            <ReviewList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
