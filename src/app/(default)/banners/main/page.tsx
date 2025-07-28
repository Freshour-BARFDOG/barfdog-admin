import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import MainBannerList from "@/components/pages/banners/main/list/MainBannerList";
import { prefetchGetMainBannerList } from "@/api/banners/queries/prefetchGetMainBannerList";

export default async function MainBannerPage() {
  const queryClient = new QueryClient();
  await prefetchGetMainBannerList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>메인 배너 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='메인 배너'>
            <MainBannerList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
