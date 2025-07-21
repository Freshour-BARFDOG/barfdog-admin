import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import InquiryList from "@/components/pages/community/inquiry/list/InquiryList";
import { prefetchGetInquiryList } from "@/api/community/queries/prefetchGetInquiryList";

export default async function InquiryPage() {
  const queryClient = new QueryClient();
  await prefetchGetInquiryList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>1:1 문의 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='1:1 문의'>
            <InquiryList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
