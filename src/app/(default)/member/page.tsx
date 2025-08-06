import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetMemberList } from "@/api/member/queries/prefetchGetMemberList";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import MemberList from "@/components/pages/member/list/MemberList";
import Loader from "@/components/common/loader/Loader";

export const metadata = {
  title: '관리자 | 회원 관리',
};

export default async function MemberPage() {
  const queryClient = new QueryClient();
  await prefetchGetMemberList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='회원 관리'>
            <MemberList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
