import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import AllianceCouponList from "@/components/pages/alliance/coupon/list/AllianceCouponList";
import { prefetchGetAllianceCouponList } from "@/api/alliance/queries/prefetchGetAllianceCouponList";

export const metadata = {
  title: '관리자 | 제휴사 쿠폰 내역',
};

export default async function AllianceCouponPage() {
  const queryClient = new QueryClient();
  await prefetchGetAllianceCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>제휴사 쿠폰 내역이 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='제휴사 쿠폰 내역'>
            <AllianceCouponList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
