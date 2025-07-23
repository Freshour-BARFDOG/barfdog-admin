import { queryKeys } from "@/constants/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { getDogDetail } from "../dogs";
import { DogDetailResponse } from "@/types/dog";

export function useGetDogDetail(
  dogId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<DogDetailResponse>
) {
  return useSuspenseQuery<DogDetailResponse>({
    queryKey: [queryKeys.DOGS.BASE, queryKeys.DOGS.GET_DOG_DETAIL, dogId],
    queryFn: () => getDogDetail(dogId),
    ...queryOptions,
  });
}
