import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { ReviewListResponse } from "@/types/review";
import { REVIEW_LIST_INITIAL_SEARCH_VALUES } from "@/constants/review";
import { getReviewList } from "@/api/review/review";

export async function prefetchGetReviewList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<ReviewListResponse>({
		queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, 0, REVIEW_LIST_INITIAL_SEARCH_VALUES],
		queryFn: () => getReviewList(0, REVIEW_LIST_INITIAL_SEARCH_VALUES , ssrAxios as AxiosInstance),
	})
}