import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreateCouponForm from "@/components/pages/benefits/coupons/form/createCouponForm/CreateCouponForm";

export const metadata = {
  title: '관리자 | 쿠폰 생성',
};

export default function CreateCouponPage() {
	return (
		<Wrapper title='쿠폰 생성'>
			<CreateCouponForm />
		</Wrapper>
	);
}
