import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import MainBannerDetail from "@/components/pages/banners/main/detail/MainBannerDetail";
import { prefetchGetMainBannerDetail } from "@/api/banners/queries/prefetchGetMainBannerDetail";
import { PageProps } from "@/types/common";

export const metadata = {
  title: '관리자 | 메인 배너 상세',
};

type Params = { bannerId: number };

export default async function MainBannerDetailPage({ params }: PageProps<Params>) {
  const resolvedParams = await params;
  const bannerId = Number(resolvedParams.bannerId);

  const queryClient = new QueryClient();
  await prefetchGetMainBannerDetail(bannerId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>메인 배너 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='메인 배너 수정'>
            <MainBannerDetail bannerId={bannerId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
