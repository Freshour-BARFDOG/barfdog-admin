import Wrapper from "@/components/layout/wrapper/Wrapper";
import CouponCreateForm from "@/components/pages/coupons/form/couponCreateForm/CouponCreateForm";

export default function CouponCreatePage() {
	return (
		<Wrapper title='쿠폰 생성'>
			<CouponCreateForm />
		</Wrapper>
	);
}
