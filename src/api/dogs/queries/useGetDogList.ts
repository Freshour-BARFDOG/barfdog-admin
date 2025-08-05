import { queryKeys } from "@/constants/queryKeys";
import { UseQueryCustomOptions } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { DogListResponse, DogListParams } from "@/types/dog";
import { getDogList } from "../dogs";

export function useGetDogList(
  params: DogListParams,
  queryOptions?: UseQueryCustomOptions<DogListResponse>
) {
  return useQuery<DogListResponse>({
    queryKey: [queryKeys.DOGS.BASE, queryKeys.DOGS.GET_DOG_LIST, params],
    queryFn: () => getDogList(params),
    keepPreviousData: true,
    ...queryOptions,
  });
}
