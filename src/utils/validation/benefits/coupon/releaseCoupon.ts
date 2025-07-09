import * as yup from "yup";
import { ReleaseCouponFormValues, ReleaseCouponTarget } from "@/types/benefits/coupons";
import { groupTargetSchema, personalTargetSchema } from "@/utils/validation/benefits/common";

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
				...personalTargetSchema,
			});

		case 'GROUP':
			return yup.object({
				...baseCouponSchema,
				...groupTargetSchema,
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
	alimTalk: false,
	memberIdList: [],
	subscribe: false,
	longUnconnected: false,
	gradeList: [],
	area: 'ALL',
	birthYearFrom: '',
	birthYearTo: '',
};