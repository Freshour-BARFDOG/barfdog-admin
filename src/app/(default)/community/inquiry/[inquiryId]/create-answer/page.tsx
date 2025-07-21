import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import CreateAnswer from "@/components/pages/community/inquiry/create/CreateAnswer";
import { prefetchInquiryDetail } from "@/api/community/queries/prefetchInquiryDetail";

interface CreateAnswerPageProps {
  params: {
    inquiryId: string;
  }
}

export default async function CreateAnswerPage({ params }: CreateAnswerPageProps) {
  const inquiryId = Number(params.inquiryId);
  const queryClient = new QueryClient();
  console.log(inquiryId)
  await prefetchInquiryDetail(inquiryId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>1:1문의 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='1:1 문의 답글 작성'>
            <CreateAnswer inquiryId={inquiryId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
