import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import AllianceManagementList from "@/components/pages/alliance/management/list/AllianceManagementList";
import Loader from "@/components/common/loader/Loader";
import { prefetchGetAllianceManagement } from "@/api/alliance/queries/prefetchGetAllianceManagement";

export const metadata = {
  title: '관리자 | 제휴사 목록',
};

export default async function AllianceManagementPage() {
  const queryClient = new QueryClient();
  await prefetchGetAllianceManagement(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>제휴사 목록이 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='제휴사 목록'>
            <AllianceManagementList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
