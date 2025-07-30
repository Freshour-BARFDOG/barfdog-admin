import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import CreateAnswer from "@/components/pages/community/inquiry/create/CreateAnswer";
import { prefetchInquiryDetail } from "@/api/community/queries/prefetchInquiryDetail";
import { PageProps } from "@/types/common";

type Params = { inquiryId: string };

export default async function CreateAnswerPage({ params }: PageProps<Params>) {
  const resolvedParams = await params;
  const inquiryId = Number(resolvedParams.inquiryId);
  const queryClient = new QueryClient();
  
  await prefetchInquiryDetail(inquiryId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>1:1문의 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper>
            <CreateAnswer inquiryId={inquiryId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
