import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Spinner from "@/components/common/spinner/Spinner";
import SalesCancel from "@/components/pages/sales/cancel/SalesCancel";

export const metadata = {
  title: "관리자 | 취소 관리",
};

export default async function SalesCancelPage() {
  return (
    <ErrorBoundary fallback={<div>주문 정보가 없습니다.</div>}>
      <Suspense fallback={<Spinner fullscreen />}>
        <Wrapper title="취소 관리">
          <SalesCancel />
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
}
