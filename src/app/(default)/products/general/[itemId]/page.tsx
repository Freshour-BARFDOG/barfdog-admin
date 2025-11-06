import { Suspense } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import GeneralProductEdit from "@/components/pages/products/general/GeneralProductEdit";
import { PageProps } from "@/types/common";
import { prefetchGetGeneralProductDetail } from "@/api/products/queries/usePrefetchGetGeneralProductDetail";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Spinner from "@/components/common/spinner/Spinner";

export const metadata = {
  title: "관리자 | 일반 상품 상세",
};

type Params = { itemId: string };

export default async function GeneralProductCreatePage({
  params,
}: PageProps<Params>) {
  const resolvedParams = await params;
  const itemId = Number(resolvedParams.itemId);

  const queryClient = new QueryClient();
  await prefetchGetGeneralProductDetail(itemId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary
        fallback={<div>일반 상품 상세 정보를 불러오지 못했습니다.</div>}
      >
        <Suspense fallback={<Spinner fullscreen />}>
          <Wrapper title="일반 상품 수정">
            <GeneralProductEdit itemId={itemId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
