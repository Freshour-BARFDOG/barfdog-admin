import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import TopBanner from "@/components/pages/banners/top/TopBanner";
import { prefetchGetTopBanner } from "@/api/banners/queries/prefetchGetTopBanner";

export default async function TopBannerPage() {
  const queryClient = new QueryClient();
  await prefetchGetTopBanner(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>최상단 띠 배너 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='최상단 띠 배너'>
            <TopBanner />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
