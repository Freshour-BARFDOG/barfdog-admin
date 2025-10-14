import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import SalesDelivery from "@/components/pages/sales/delivery/SalesDelivery";
import Spinner from "@/components/common/spinner/Spinner";

export const metadata = {
  title: "관리자 | 배송 관리",
};

export default async function SalesDeliveryPage() {
  return (
    <ErrorBoundary fallback={<div>배송 정보가 없습니다.</div>}>
      <Suspense fallback={<Spinner fullscreen />}>
        <Wrapper title="배송 관리">
          <SalesDelivery />
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
}
