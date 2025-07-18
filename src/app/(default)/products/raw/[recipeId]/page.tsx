import RawProductEdit from "@/components/pages/products/raw/RawProductEdit";

interface PageProps {
  params: {
    recipeId: string;
  };
}

export default function RawProductCreatePage({ params }: PageProps) {
  const recipeId = Number(params.recipeId);
  return <RawProductEdit recipeId={recipeId} />;
}
