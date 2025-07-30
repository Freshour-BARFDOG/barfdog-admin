import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { DogListParams, DogListResponse } from "@/types/dog";
import { getDogList } from "../dogs";

export async function prefetchGetDogList(
  params: DogListParams,
  queryClient: QueryClient
) {
  const ssrAxios = await createSSRRequest();
  await queryClient.prefetchQuery<DogListResponse>({
    queryKey: [queryKeys.DOGS.BASE, queryKeys.DOGS.GET_DOG_LIST, params],
    queryFn: () => getDogList(params, ssrAxios as AxiosInstance),
  });
}
