import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { ReviewListResponse, ReviewListSearchParams } from "@/types/review";
import { getReviewList } from "@/api/review/review";

export function useGetReviewList(
	page: number,
	searchParams: ReviewListSearchParams,
	queryOptions?: UseQueryCustomOptions<ReviewListResponse>,
) {
	return useQuery<ReviewListResponse>({
		queryKey: [
			queryKeys.REVIEW.BASE,
			queryKeys.REVIEW.GET_REVIEW_LIST,
			page,
			searchParams,
		],
		queryFn: () => getReviewList(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}