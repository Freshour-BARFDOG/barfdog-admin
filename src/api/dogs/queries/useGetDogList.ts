import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DogListResponse, DogListParams } from "@/types/dog";
import { getDogList } from "../dogs";

export function useGetDogList(
  params: DogListParams,
  queryOptions?: UseSuspenseQueryCustomOptions<DogListResponse>
) {
  return useSuspenseQuery<DogListResponse>({
    queryKey: [queryKeys.DOGS.BASE, queryKeys.DOGS.GET_DOG_LIST, params],
    queryFn: () => getDogList(params),
    keepPreviousData: true,
    ...queryOptions,
  });
}
