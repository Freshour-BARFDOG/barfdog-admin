import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import OrderDeadlinePolicy from "@/components/pages/policies/orderDeadline/OrderDeadlinePolicy";

export const metadata = {
  title: '관리자 | 주문 마감일 정책',
};

export const dynamic = 'force-dynamic';

export default function DiscountPolicyPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Wrapper title="주문 마감일 정책">
        <OrderDeadlinePolicy />
      </Wrapper>
    </Suspense>
  );
}
