import { queryKeys } from "@/constants/queryKeys";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { RecommendArticleResponse } from "@/types/community";
import { getRecommendArticle } from "@/api/community/community";

export function useGetRecommendArticle(queryOptions?: UseQueryCustomOptions<RecommendArticleResponse>) {
	return useQuery<RecommendArticleResponse>({
		queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_RECOMMEND_ARTICLE],
		queryFn: () => getRecommendArticle(),
		keepPreviousData: true,
		...queryOptions,
	});
}

export async function prefetchGetRecommendArticle(queryClient: QueryClient) {
	await queryClient.prefetchQuery<RecommendArticleResponse>({
		queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_RECOMMEND_ARTICLE],
		queryFn: () => getRecommendArticle(),
	})
}