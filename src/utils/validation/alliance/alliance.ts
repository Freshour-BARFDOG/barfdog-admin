import * as yup from "yup";
import { DiscountUnitType } from "@/types/common";
import { AllianceCouponTarget } from "@/types/alliance";

export const allianceSchema = yup.object().shape({
	allianceName: yup
		.string()
		.required('제목은 필수입니다.'),
	allianceCode: yup
		.string()
		.matches(/^[a-zA-Z]{0,2}$/, '영문자 2글자 이내로 입력해주세요')
		.required('필수 입력 항목입니다'),
});

export const allianceCouponSchema = yup.object().shape({
	allianceId: yup
		.number()
		.moreThan(0, '제휴 ID는 0보다 커야 합니다.')
		.required('제휴 ID는 필수입니다.'),
	allianceEventId: yup
		.number()
		.moreThan(0, '제휴 ID는 0보다 커야 합니다.')
		.required('제휴 ID는 필수입니다.'),
	name: yup
		.string()
		.required('쿠폰명은 필수입니다.'),
	description: yup
		.string()
		.required('설명은 필수입니다.'),
	couponTarget: yup
		.string()
		.required('쿠폰 대상은 필수입니다.'),
	discountType: yup
		.string()
		.required('할인 타입은 필수입니다.'),
	discountDegree: yup
		.number()
		.typeError('할인값은 숫자여야 합니다.')
		.required('할인값은 필수입니다.'),
	availableMaxDiscount: yup
		.number()
		.typeError('최대 할인 금액은 숫자여야 합니다.')
		.required('최대 할인 금액은 필수입니다.'),
	availableMinPrice: yup
		.number()
		.typeError('최소 주문 금액은 숫자여야 합니다.')
		.required('최소 주문 금액은 필수입니다.'),
	createCouponCount: yup
		.number()
		.typeError('쿠폰 발급 수량은 숫자여야 합니다.')
		.required('쿠폰 발급 수량은 필수입니다.'),
	codeLength: yup
		.number()
		.typeError('코드 길이는 숫자여야 합니다.')
		.required('코드 길이는 필수입니다.'),
	useStartDate: yup
		.string()
		.required('시작일은 필수입니다.'),
	useExpiredDate: yup
		.string()
		.required('종료일은 필수입니다.'),
});

export const defaultAllianceCouponFormValues = {
	allianceId: 0, // 제휴사 id
	allianceEventId: 0, // 행사 id
	name: '', // 쿠폰 이름
	description: '', // 쿠폰 설명
	couponTarget: 'ALL' as AllianceCouponTarget, // 사용처 (전체/정기구독/일반상품)
	discountDegree: 0, // 할인율
	discountType: 'FIXED_RATE' as DiscountUnitType, // 할인타입
	availableMaxDiscount: 0, // 최대 할인금액
	availableMinPrice: 0, // 최소 사용금액
	createCouponCount: 0, // 발행 쿠폰 개수
	codeLength: 8, // 발행 쿠폰 코드 자리 수
	useStartDate: '', // 사용 시작일
	useExpiredDate: '', // 사용 마지막일
};