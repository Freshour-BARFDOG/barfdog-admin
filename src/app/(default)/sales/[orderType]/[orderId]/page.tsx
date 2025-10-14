import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import SalesDetailGeneral from "@/components/pages/sales/detail/SalesDetailGeneral";
import SalesDetailSubscribe from "@/components/pages/sales/detail/SalesDetailSubscribe";
import { OrderTypeResponse } from "@/types/sales";
import { PageProps } from "@/types/common";
import Spinner from "@/components/common/spinner/Spinner";

export const metadata = {
  title: "관리자 | 주문 상세",
};

type Params = {
  orderType: OrderTypeResponse;
  orderId: string;
};

export default async function SalesDetailPage({ params }: PageProps<Params>) {
  const { orderType, orderId } = await params;
  const id = Number(orderId);
  return (
    <ErrorBoundary fallback={<div>주문 상세 정보가 없습니다.</div>}>
      <Suspense fallback={<Spinner fullscreen />}>
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
