import Wrapper from "@/components/layout/wrapper/Wrapper";
import RawProductEdit from "@/components/pages/products/raw/RawProductEdit";
import { PageProps } from "@/types/common";

export const metadata = {
  title: '관리자 | 레시피 상세',
};

type Params = { recipeId: string };

export default async function RawProductCreatePage({ params }: PageProps<Params>) {
  const resolvedParams = await params;
  const recipeId = Number(resolvedParams.recipeId);
  return (
    <Wrapper title="레시피 수정">
      <RawProductEdit recipeId={recipeId} />
    </Wrapper>
  );
}