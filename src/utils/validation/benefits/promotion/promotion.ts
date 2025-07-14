import { PromotionStatus, PromotionType } from '@/types/benefits/promotions';
import * as yup from 'yup';

export const promotionSchema = yup.object().shape({
	promotionType: yup
		.string()
		.oneOf(['COUPON'], '유효한 프로모션 타입이어야 합니다.')
		.required('프로모션 타입은 필수입니다.'),
	name: yup
		.string()
		.required('프로모션 이름은 필수입니다.'),
	startDate: yup
		.string()
		.required('시작일은 필수입니다.'),
	expiredDate: yup
		.string()
		.required('종료일은 필수입니다.'),
	couponId: yup
		.number()
		.required('쿠폰 ID는 필수입니다.'),
	quantity: yup
		.number()
		.min(1, '발행 수량은 최소 1 이상이어야 합니다.')
		.required('발행 수량은 필수입니다.'),
	status: yup
		.string()
		.oneOf(['PAUSED', 'ACTIVE', 'INACTIVE'], '유효한 프로모션 상태여야 합니다.')
		.required('상태는 필수입니다.'),
});

export const defaultValues = {
	couponId: null,
	expiredDate: '',
	name: '',
	promotionType: "COUPON" as PromotionType,
	quantity: 0,
	startDate: '',
	status: "ACTIVE" as PromotionStatus,
}