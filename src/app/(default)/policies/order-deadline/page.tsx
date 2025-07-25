import Wrapper from "@/components/layout/wrapper/Wrapper";
import OrderDeadlinePolicy from "@/components/pages/policies/orderDeadline/OrderDeadlinePolicy";

export default function DiscountPolicyPage() {
  return (
    <Wrapper title="주문 마감일 정책">
      <OrderDeadlinePolicy />
    </Wrapper>
  );
}
