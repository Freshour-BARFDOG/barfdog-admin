import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import SalesSearch from "@/components/pages/sales/search/SalesSearch";

export default async function SalesSearchPage() {
  return (
    <ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
      <Suspense fallback={<Loader fullscreen />}>
        <Wrapper title="회원 관리">
          <SalesSearch />
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
}
