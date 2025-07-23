import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import AllianceCouponDetail from "@/components/pages/alliance/coupon/detail/AllianceCouponDetail";
import { prefetchAllianceCouponDetail } from "@/api/alliance/queries/prefetchAllianceCouponDetail";

interface AllianceDetailPageProps {
  params: {
    bundle: string;
  }
}

export default async function AllianceCouponDetailPage({ params }: AllianceDetailPageProps) {
  const queryClient = new QueryClient();
  await prefetchAllianceCouponDetail(params.bundle, queryClient)
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>쿠폰 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='쿠폰 상세'>
            <AllianceCouponDetail bundle={params.bundle} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
