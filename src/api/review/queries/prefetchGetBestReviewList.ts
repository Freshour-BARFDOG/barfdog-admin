import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { BestReviewData } from "@/types/review";
import { getBestReviewList } from "@/api/review/review";

export async function prefetchGetBestReviewList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<BestReviewData[]>({
		queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_BEST_REVIEW_LIST],
		queryFn: () => getBestReviewList(ssrAxios as AxiosInstance),
	})
}