import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { ArticleDetailResponse } from "@/types/community";
import { getArticleDetail } from "@/api/community/community";

export function useGetArticleDetail(
	articleId: number,
	queryOptions?: UseQueryCustomOptions<ArticleDetailResponse>,
) {
	return useQuery<ArticleDetailResponse>({
		queryKey: [
			queryKeys.COMMUNITY.BASE,
			queryKeys.COMMUNITY.GET_ARTICLE_DETAIL,
			articleId,
		],
		queryFn: () => getArticleDetail(articleId),
		keepPreviousData: true,
		...queryOptions,
	});
}