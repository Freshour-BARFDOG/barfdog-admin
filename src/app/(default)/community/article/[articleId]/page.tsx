import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import ArticleDetail from "@/components/pages/community/article/detail/ArticleDetail";
import { prefetchCommunityDetail } from "@/api/community/queries/prefetchCommunityDetail";
import { PageProps } from "@/types/common";

type Params = { articleId: string };

export default async function ArticleDetailPage({ params }: PageProps<Params>) {
  const resolvedParams = await params;
  const articleId = Number(resolvedParams.articleId);

  const queryClient = new QueryClient();
  await prefetchCommunityDetail('article', articleId, queryClient);
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
