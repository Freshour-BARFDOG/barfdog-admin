import { prefetchGetDogList } from "@/api/dogs/queries/prefetchGetDogList";
import Loader from "@/components/common/loader/Loader";
import DogList from "@/components/pages/dogs/list/DogList";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { INITIAL_DOGS_REQUEST } from "@/constants/dog";
import { PAGE_SIZE } from "@/constants/common";
import Wrapper from "@/components/layout/wrapper/Wrapper";

export default async function DogPage() {
  const queryClient = new QueryClient();
  const params = {
    body: INITIAL_DOGS_REQUEST,
    page: 0,
    size: PAGE_SIZE.SALES.ORDERS,
  };

  await prefetchGetDogList(params, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<div>구독중인 데이터가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='반려견 관리'>
            <DogList />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
