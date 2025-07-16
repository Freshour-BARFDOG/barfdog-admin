import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import ArticleDetail from "@/components/pages/community/article/detail/ArticleDetail";
import { prefetchGetArticleDetail } from "@/api/community/queries/usePrefetchGetArticleDetail";

interface UpdateNoticePageProps {
  params: {
    articleId: string;
  }
}

export default async function UpdateNoticePage({ params }: UpdateNoticePageProps) {
  const articleId = Number(params.articleId);

  const queryClient = new QueryClient();
  await prefetchGetArticleDetail(articleId, queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>아티클 상세 정보가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <Wrapper title='아티클 수정'>
            <ArticleDetail articleId={articleId} />
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  );
}
