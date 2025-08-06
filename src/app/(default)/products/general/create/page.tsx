import Wrapper from "@/components/layout/wrapper/Wrapper";
import GeneralProductCreate from "@/components/pages/products/general/GeneralProductCreate";

export const metadata = {
  title: '관리자 | 일반 상품 등록',
};

export default function GeneralProductCreatePage() {
  return (
    <Wrapper title="일반 상품 등록">
      <GeneralProductCreate />
    </Wrapper>
  );
}
