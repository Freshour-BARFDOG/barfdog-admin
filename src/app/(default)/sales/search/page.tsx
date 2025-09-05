import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import SalesSearch from "@/components/pages/sales/search/SalesSearch";
import Spinner from "@/components/common/spinner/Spinner";

export const metadata = {
  title: "관리자 | 주문 통합 검색",
};

export default async function SalesSearchPage() {
  return (
    <ErrorBoundary fallback={<div>주문 통합 검색 정보가 없습니다.</div>}>
      <Suspense fallback={<Spinner fullscreen />}>
        <Wrapper title="통합 검색">
          <SalesSearch />
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
}
