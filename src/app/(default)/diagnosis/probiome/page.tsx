import Spinner from "@/components/common/spinner/Spinner";
import ProbiomeDiagnosis from "@/components/pages/diagnosis/probiome/ProbiomeDiagnosis";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const metadata = {
  title: "관리자 | 장내 미생물 진단",
};

export default function ProbiomeDiagnosisPage() {
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
      <Suspense fallback={<Spinner fullscreen />}>
        <ProbiomeDiagnosis />
      </Suspense>
    </ErrorBoundary>
  );
}
