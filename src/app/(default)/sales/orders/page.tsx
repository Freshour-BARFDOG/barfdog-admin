import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import SalesOrders from "@/components/pages/sales/orders/SalesOrders";

export default async function SalesOrdersPage() {
  return (
    <ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
      <Suspense fallback={<Loader fullscreen />}>
        <Wrapper title="주문 관리">
          <SalesOrders />
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
}
