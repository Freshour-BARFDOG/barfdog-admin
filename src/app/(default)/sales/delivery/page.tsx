import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import SalesDelivery from "@/components/pages/sales/delivery/SalesDelivery";

export default async function SalesDeliveryPage() {
  return (
    <ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
      <Suspense fallback={<Loader fullscreen />}>
        <Wrapper title="배송 관리">
          <SalesDelivery />
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
}
