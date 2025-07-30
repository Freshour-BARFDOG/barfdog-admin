import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import PopupDetail from "@/components/pages/banners/popup/detail/PopupDetail";
import { prefetchGetPopupDetail } from "@/api/banners/queries/prefetchGetPopupDetail";
import { PageProps } from "@/types/common";

type Params = { popupId: string };

export default async function PopupDetailPage({ params }: PageProps<Params>) {
  const resolvedParams = await params;
  const popupId = Number(resolvedParams.popupId);

  const queryClient = new QueryClient();
  await prefetchGetPopupDetail(popupId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>팝업 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='팝업 수정'>
            <PopupDetail popupId={popupId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
