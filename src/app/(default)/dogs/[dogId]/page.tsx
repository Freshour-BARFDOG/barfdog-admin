import { prefetchGetDogDetail } from "@/api/dogs/queries/prefetchGetDogDetail";
import Loader from "@/components/common/loader/Loader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import DogDetail from "@/components/pages/dogs/detail/DogDetail";
import { PageProps } from "@/types/common";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const metadata = {
  title: '관리자 | 반려견 상세',
};

type Params = { dogId: string };

export default async function DogDetailPage({ params }: PageProps<Params>) {
  const queryClient = new QueryClient();
  const resolvedParams = await params;
  const dogId = Number(resolvedParams.dogId);
  await prefetchGetDogDetail(dogId, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<Loader fullscreen />}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title="반려견 상세">
            <DogDetail dogId={dogId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
