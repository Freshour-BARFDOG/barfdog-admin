import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import CouponList from "@/components/pages/benefits/coupons/list/couponList/CouponList";
import { prefetchGetCouponList } from "@/api/coupons/queries/prefetchGetCouponList";

export const metadata = {
  title: '관리자 | 쿠폰',
};

export default async function CouponsPage() {
  const queryClient = new QueryClient();
  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>쿠폰 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='쿠폰 조회'>
            <CouponList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
