import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import MemberCouponList from "@/components/pages/benefits/coupons/list/memberCouponList/MemberCouponList";
import { prefetchGetMemberCouponList } from "@/api/coupons/queries/usePrefetchGetMemberCouponList";

export default async function MemberCouponsPage() {
  const queryClient = new QueryClient();
  await prefetchGetMemberCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>쿠폰 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='쿠폰 사용 현황'>
            <MemberCouponList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
