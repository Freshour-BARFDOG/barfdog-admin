import Wrapper from "@/components/layout/wrapper/Wrapper";
import RawProductCreate from "@/components/pages/products/raw/RawProductCreate";

export const metadata = {
  title: '관리자 | 레시피 등록',
};

export default function RawProductCreatePage() {
  return (
    <Wrapper title="레시피 등록">
      <RawProductCreate />
    </Wrapper>
  );
}
