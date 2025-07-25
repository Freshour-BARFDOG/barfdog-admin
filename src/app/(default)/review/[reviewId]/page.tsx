import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import ReviewDetail from "@/components/pages/review/detail/ReviewDetail";
import { prefetchReviewDetail } from "@/api/review/queries/prefetchReviewDetail";

interface ReviewDetailPageProps {
  params: {
    reviewId: string;
  }
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const reviewId = Number(params.reviewId);
  const queryClient = new QueryClient();
  await prefetchReviewDetail(reviewId, queryClient)
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>리뷰 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='리뷰 상세'>
            <ReviewDetail reviewId={reviewId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
