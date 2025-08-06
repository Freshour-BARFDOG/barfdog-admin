import Wrapper from "@/components/layout/wrapper/Wrapper";
import RawProductList from "@/components/pages/products/raw/RawProductList";

export const metadata = {
  title: '관리자 | 레시피 관리',
};

export default function RawProductPage() {
  return (
    <Wrapper title="레시피 관리">
      <RawProductList />
    </Wrapper>
  );
}
