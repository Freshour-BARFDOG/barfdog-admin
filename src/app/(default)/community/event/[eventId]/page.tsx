import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import EventDetail from "@/components/pages/community/event/detail/EventDetail";
import { prefetchCommunityDetail } from "@/api/community/queries/prefetchCommunityDetail";

interface EventDetailPageProps {
  params: {
    eventId: string;
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = Number(params.eventId);

  const queryClient = new QueryClient();
  await prefetchCommunityDetail('events', eventId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>이벤트 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='이벤트 수정'>
            <EventDetail eventId={eventId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
