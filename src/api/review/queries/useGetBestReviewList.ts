import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { BestReviewData } from "@/types/review";
import { getBestReviewList } from "@/api/review/review";

export function useGetBestReviewList(queryOptions?: UseQueryCustomOptions<BestReviewData[]>,) {
	return useQuery<BestReviewData[]>({
		queryKey: [
			queryKeys.REVIEW.BASE,
			queryKeys.REVIEW.GET_BEST_REVIEW_LIST,
		],
		queryFn: () => getBestReviewList(),
		keepPreviousData: true,
		...queryOptions,
	});
}
