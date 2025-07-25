import Wrapper from "@/components/layout/wrapper/Wrapper";
import DeliveryFeePolicy from "@/components/pages/policies/deliveryFee/DeliveryFeePolicy";

export default function CouponPolicyPage() {
  return (
    <Wrapper title="배송비 정책">
      <DeliveryFeePolicy />
    </Wrapper>
  );
}
