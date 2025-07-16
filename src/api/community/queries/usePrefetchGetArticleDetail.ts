import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { ArticleDetailResponse } from "@/types/community";
import { getArticleDetail } from "@/api/community/community";

export async function prefetchGetArticleDetail(articleId: number, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<ArticleDetailResponse>({
		queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_ARTICLE_DETAIL, articleId],
		queryFn: () => getArticleDetail(articleId, ssrAxios),
	})
}