import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import AllianceSalesList from "@/components/pages/alliance/sales/AllianceSalesList";
import { prefetchGetAllianceSalesList } from "@/api/alliance/queries/prefetchGetAllianceSalesList";

export const metadata = {
  title: '관리자 | 제휴사 매출 내역',
};

export default async function AllianceSalesListPage() {
  const queryClient = new QueryClient();
  await prefetchGetAllianceSalesList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>매출 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='매출'>
            <AllianceSalesList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
