import { prefetchGetProbiomeDetail } from "@/api/diagnosis/queries/prefetchGetDogDetail";
import Spinner from "@/components/common/spinner/Spinner";
import ProbiomeDetail from "@/components/pages/diagnosis/probiome/detail/ProbiomeDetail";
import { PageProps } from "@/types/common";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const metadata = {
  title: "관리자 | 장내 미생물 진단 상세",
};

type Params = { diagnosisId: string };

export default async function ProbiomeDetailPage({
  params,
}: PageProps<Params>) {
  const queryClient = new QueryClient();
  const resolvedParams = await params;
  const diagnosisId = Number(resolvedParams.diagnosisId);
  await prefetchGetProbiomeDetail(diagnosisId, queryClient);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ProbiomeDetail diagnosisId={diagnosisId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
