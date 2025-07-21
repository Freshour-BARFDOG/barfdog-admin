import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import InquiryDetail from "@/components/pages/community/inquiry/detail/InquiryDetail";
import { prefetchInquiryDetail } from "@/api/community/queries/prefetchInquiryDetail";

interface InquiryDetailPageProps {
  params: {
    inquiryId: string;
  }
}

export default async function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const inquiryId = Number(params.inquiryId);
  const queryClient = new QueryClient();
  await prefetchInquiryDetail(inquiryId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>1:1 문의 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='1:1 문의 상세'>
            <InquiryDetail inquiryId={inquiryId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
