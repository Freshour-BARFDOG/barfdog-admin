import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import BestReviewList from "@/components/pages/review/list/bestReviewList/BestReviewList";
import { prefetchGetBestReviewList } from "@/api/review/queries/prefetchGetBestReviewList";

export default async function BestReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetBestReviewList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>베스트 리뷰 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='베스트 리뷰 조회'>
            <BestReviewList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
