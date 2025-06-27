import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import OrdersSearch from "@/components/pages/orders/search/OrdersSearch";

export default async function OrdersSearchPage() {
  return (
    <ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
      <Suspense fallback={<Loader fullscreen />}>
        <Wrapper title="회원 관리">
          <OrdersSearch />
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
}
