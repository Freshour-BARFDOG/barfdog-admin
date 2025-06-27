import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import {
  prefetchGetMemberDetail,
  prefetchGetMemberSubscriptionList
} from "@/api/member/queries/usePrefetchGetMemberDetail";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import MemberDetail from "@/components/pages/member/detail/MemberDetail";

interface MemberDetailPageProps {
  params: {
    memberId: string;
  }
}

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { memberId } = await params;
  const numMemberId = Number(memberId);
  const queryClient = new QueryClient();
  await prefetchGetMemberDetail(numMemberId, queryClient);
  await prefetchGetMemberSubscriptionList(numMemberId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='회원 상세'>
            <MemberDetail memberId={numMemberId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
