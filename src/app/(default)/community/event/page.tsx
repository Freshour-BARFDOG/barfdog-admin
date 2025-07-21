import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import EventList from "@/components/pages/community/event/list/EventList";
import { prefetchCommunityList } from "@/api/community/queries/prefetchCommunityList";
import { queryKeys } from "@/constants/queryKeys";
import { PAGE_SIZE } from "@/constants/common";

export default async function EventPage() {
  const queryClient = new QueryClient();
  await prefetchCommunityList({
    queryClient,
    queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_EVENT_LIST, 0],
    type: 'events',
    key: 'queryEventsAdminDtoList',
    size: PAGE_SIZE.COMMON,
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>이벤트 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='이벤트'>
            <EventList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
