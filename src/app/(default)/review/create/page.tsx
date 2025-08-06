import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import CreateReview from "@/components/pages/review/create/CreateReview";
import { prefetchGetProductItemList } from "@/api/review/queries/prefetchGetProductItemList";
import { ProductItemType } from "@/types/review";

export const metadata = {
  title: '관리자 | 리뷰 생성',
};

export default async function CreateReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetProductItemList('ALL' as ProductItemType, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상품 및 레시피 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='리뷰 생성'>
            <CreateReview />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
