import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import SalesDetailGeneral from "@/components/pages/sales/detail/SalesDetailGeneral";
import SalesDetailSubscribe from "@/components/pages/sales/detail/SalesDetailSubscribe";
import { OrderTypeResponse } from "@/types/sales";

interface SalesDetailPageProps {
  params: {
    orderType: OrderTypeResponse;
    orderId: string;
  };
}

export default async function SalesDetailPage({
  params,
}: SalesDetailPageProps) {
  const { orderType, orderId } = await params;
  const id = Number(orderId);
  return (
    <ErrorBoundary fallback={<div>판매 상세 정보가 없습니다.</div>}>
      <Suspense fallback={<Loader fullscreen />}>
        <Wrapper title="주문 상세 정보">
          {orderType === "subscribe" ? (
            <SalesDetailSubscribe orderId={id} />
          ) : (
            <SalesDetailGeneral orderId={id} />
          )}
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
}
