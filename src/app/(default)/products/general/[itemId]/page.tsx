import Wrapper from "@/components/layout/wrapper/Wrapper";
import GeneralProductEdit from "@/components/pages/products/general/GeneralProductEdit";

interface PageProps {
  params: {
    itemId: string;
  };
}

export default function GeneralProductCreatePage({ params }: PageProps) {
  const itemId = Number(params.itemId);
  return (
    <Wrapper title="일반 상품 수정">
      <GeneralProductEdit itemId={itemId} />
    </Wrapper>
  );
}
