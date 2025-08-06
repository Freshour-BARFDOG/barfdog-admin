import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import GeneralProductList from "@/components/pages/products/general/GeneralProductList";

export const metadata = {
  title: '관리자 | 일반 상품 관리',
};

export default function GeneralProductListPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Wrapper title="일반 상품 관리">
        <GeneralProductList />
      </Wrapper>
    </Suspense>
  );
}
