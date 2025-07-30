import Wrapper from "@/components/layout/wrapper/Wrapper";
import CouponPolicy from "@/components/pages/policies/coupon/CouponPolicy";

export const dynamic = 'force-dynamic';

export default function CouponPolicyPage() {
  return (
    <Wrapper title="쿠폰 정책">
      <CouponPolicy />
    </Wrapper>
  );
}
