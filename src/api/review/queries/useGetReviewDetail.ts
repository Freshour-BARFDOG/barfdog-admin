import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { ReviewDetailResponse } from "@/types/review";
import { getReviewDetail } from "@/api/review/review";

export function useGetReviewDetail(
	reviewId: number,
	queryOptions?: UseQueryCustomOptions<ReviewDetailResponse>,
) {
	return useQuery<ReviewDetailResponse>({
		queryKey: [
			queryKeys.REVIEW.BASE,
			queryKeys.REVIEW.GET_REVIEW_DETAIL,
			reviewId,
		],
		queryFn: () => getReviewDetail(reviewId),
		keepPreviousData: true,
		...queryOptions,
	});
}
