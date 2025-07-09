import * as yup from "yup";
import { ReleaseCouponFormValues, ReleaseCouponTarget } from "@/types/coupons";

export const baseCouponSchema = {
	couponType: yup.string().oneOf(['CODE_PUBLISHED', 'GENERAL_PUBLISHED']).required(),
	couponId: yup.number().required(),
	expiredDate: yup.string().required(),
	alimTalk: yup.boolean().required(),
};

export const getCouponSchemaByTarget = (type: ReleaseCouponTarget) => {
	switch (type) {
		case 'PERSONAL':
			return yup.object({
				...baseCouponSchema,
				memberIdList: yup
					.array()
					.of(yup.number())
					.min(1, '최소 한 명 이상의 회원을 선택해주세요.')
					.required(),
			});

		case 'GROUP':
			return yup.object({
				...baseCouponSchema,
				subscribe: yup.boolean().required(),
				longUnconnected: yup.boolean().required(),
				gradeList: yup
					.array()
					.of(yup.string())
					.min(1, '등급을 선택해주세요.'),
				area: yup.string().required('지역을 선택해주세요.'),
				birthYearFrom: yup.string().required(),
				birthYearTo: yup.string().required(),
			});

		case 'ALL':
		default:
			return yup.object({
				...baseCouponSchema,
			});
	}
};

export const defaultValues: ReleaseCouponFormValues = {
	couponType: 'CODE_PUBLISHED',
	couponId: null,
	expiredDate: '',
	alimTalk: true,
	memberIdList: [],
	subscribe: false,
	longUnconnected: false,
	gradeList: [],
	area: 'ALL',
	birthYearFrom: '',
	birthYearTo: '',
};