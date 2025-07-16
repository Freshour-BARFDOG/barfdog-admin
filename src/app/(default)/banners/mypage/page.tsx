import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import MyPageBanner from "@/components/pages/banners/myPage/MyPageBanner";
import { prefetchGetMyPageBanner } from "@/api/banners/queries/usePrefetchGetMyPageBanner";

export default async function MyPageBannerPage() {
  const queryClient = new QueryClient();
  await prefetchGetMyPageBanner(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>마이페이지 배너 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='마이페이지 배너'>
            <MyPageBanner />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
