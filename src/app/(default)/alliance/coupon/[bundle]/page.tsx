import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import AllianceCouponDetail from "@/components/pages/alliance/coupon/detail/AllianceCouponDetail";
import { prefetchAllianceCouponDetail } from "@/api/alliance/queries/prefetchAllianceCouponDetail";
import { PageProps } from "@/types/common";

export const metadata = {
  title: '관리자 | 제휴사 쿠폰 상세',
};

type Params = { bundle: string };

export default async function Page({ params }: PageProps<Params>) {
  const resolvedParams = await params;

  const queryClient = new QueryClient();
  await prefetchAllianceCouponDetail(resolvedParams.bundle, queryClient)
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>쿠폰 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='쿠폰 상세'>
            <AllianceCouponDetail bundle={resolvedParams.bundle} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}