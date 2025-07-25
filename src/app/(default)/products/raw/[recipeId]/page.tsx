import Wrapper from "@/components/layout/wrapper/Wrapper";
import RawProductEdit from "@/components/pages/products/raw/RawProductEdit";

interface PageProps {
  params: {
    recipeId: string;
  };
}

export default function RawProductCreatePage({ params }: PageProps) {
  const recipeId = Number(params.recipeId);
  return (
    <Wrapper title="레시피 수정">
      <RawProductEdit recipeId={recipeId} />
    </Wrapper>
  );
}
