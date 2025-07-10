import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import RewardList from "@/components/pages/benefits/rewards/list/RewardList";
import { prefetchGetRewardList } from "@/api/rewards/queries/usePrefetchGetRewardList";

export default async function CouponsPage() {
  const queryClient = new QueryClient();
  await prefetchGetRewardList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>적립금 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='적립금 조회'>
            <RewardList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
