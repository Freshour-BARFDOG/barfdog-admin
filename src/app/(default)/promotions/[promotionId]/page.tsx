import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import PromotionDetail from "@/components/pages/benefits/promotions/detail/PromotionDetail";
import {
  prefetchGetPromotionDetail,
  prefetchGetPromotionMemberList
} from "@/api/promotions/queries/prefetchGetPromotionDetail";
import { PageProps } from "@/types/common";

export const metadata = {
  title: '관리자 | 프로모션 상세',
};

type Params = { promotionId: string };

export default async function PromotionDetailPage({ params }: PageProps<Params>) {;
  const resolvedParams = await params;
  const promotionId = Number(resolvedParams.promotionId);

  const queryClient = new QueryClient();
  await prefetchGetPromotionDetail(promotionId, queryClient);
  await prefetchGetPromotionMemberList(promotionId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>프로모션 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper>
            <PromotionDetail promotionId={promotionId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
