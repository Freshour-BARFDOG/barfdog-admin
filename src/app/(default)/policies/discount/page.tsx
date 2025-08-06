import Wrapper from "@/components/layout/wrapper/Wrapper";
import DiscountPolicy from "@/components/pages/policies/discount/DiscountPolicy";

export const metadata = {
  title: '관리자 | 할인 정책',
};

export const dynamic = 'force-dynamic';

export default function DiscountPolicyPage() {
  return (
    <Wrapper title="할인 정책">
      <DiscountPolicy />
    </Wrapper>
  );
}
