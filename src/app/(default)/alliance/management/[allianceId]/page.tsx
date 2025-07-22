import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import { prefetchAllianceDetail } from "@/api/alliance/queries/prefetchAllianceDetail";
import AllianceDetail from "@/components/pages/alliance/management/detail/AllianceDetail";

interface AllianceDetailPageProps {
  params: {
    allianceId: string;
  }
}

export default async function PromotionDetailPage({ params }: AllianceDetailPageProps) {
  const allianceId = Number(params.allianceId);
  const queryClient = new QueryClient();
  await prefetchAllianceDetail(allianceId, queryClient)
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>제휴사 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='제휴사 상세'>
            <AllianceDetail allianceId={allianceId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
