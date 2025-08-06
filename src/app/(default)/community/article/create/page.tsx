import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreateArticle from "@/components/pages/community/article/create/CreateArticle";

export const metadata = {
  title: '관리자 | 아티클 등록',
};

export default async function CreateArticlePage() {
  return (
    <Wrapper title='아티클 등록'>
      <CreateArticle />
    </Wrapper>
  );
}
