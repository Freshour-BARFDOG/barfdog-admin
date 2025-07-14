import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import PromotionDetail from "@/components/pages/benefits/promotions/detail/PromotionDetail";
import {
  prefetchGetPromotionDetail,
  prefetchGetPromotionMemberList
} from "@/api/promotions/queries/usePrefetchGetPromotionDetail";

interface PromotionDetailPageProps {
  params: {
    promotionId: string;
  }
}

export default async function PromotionDetailPage({ params }: PromotionDetailPageProps) {
  const { promotionId } = await params;
  const numPromotionId = Number(promotionId);
  const queryClient = new QueryClient();
  await prefetchGetPromotionDetail(numPromotionId, queryClient);
  await prefetchGetPromotionMemberList(numPromotionId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper>
            <PromotionDetail promotionId={numPromotionId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
