import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { DogDetailResponse } from "@/types/dog";
import { getDogDetail } from "../dogs";

export async function prefetchGetDogDetail(
  dogId: number,
  queryClient: QueryClient
) {
  const ssrAxios = await createSSRRequest();
  await queryClient.prefetchQuery<DogDetailResponse>({
    queryKey: [queryKeys.DOGS.BASE, queryKeys.DOGS.GET_DOG_DETAIL, dogId],
    queryFn: () => getDogDetail(dogId, ssrAxios as AxiosInstance),
  });
}
