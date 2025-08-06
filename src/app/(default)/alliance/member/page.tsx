import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import AllianceMemberList from "@/components/pages/alliance/member/AllianceMemberList";
import Loader from "@/components/common/loader/Loader";
import { prefetchGetAllianceMemberList } from "@/api/alliance/queries/prefetchGetAllianceMemberList";

export const metadata = {
  title: '관리자 | 제휴사 가입자 내역',
};

export default async function AllianceMemberListPage() {
  const queryClient = new QueryClient();
  await prefetchGetAllianceMemberList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>가입자 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='가입자 내역'>
            <AllianceMemberList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
