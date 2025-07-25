import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { ReviewDetailResponse } from "@/types/review";
import { getReviewDetail } from "@/api/review/review";

export async function prefetchReviewDetail(reviewId: number, queryClient: QueryClient) {
  const ssrAxios = await createSSRRequest();
  await queryClient.prefetchQuery<ReviewDetailResponse>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_DETAIL, reviewId],
    queryFn: () => getReviewDetail(reviewId, ssrAxios as AxiosInstance),
  })
}