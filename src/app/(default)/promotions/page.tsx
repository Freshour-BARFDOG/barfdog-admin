import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import PromotionList from "@/components/pages/benefits/promotions/list/PromotionList";
import { prefetchGetPromotionList } from "@/api/promotions/queries/usePrefetchGetPromotionList";

export default async function PromotionPage() {
  const queryClient = new QueryClient();
  await prefetchGetPromotionList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>프로모션 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='프로모션 조회'>
            <PromotionList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
