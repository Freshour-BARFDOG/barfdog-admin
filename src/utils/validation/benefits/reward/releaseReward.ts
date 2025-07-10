import * as yup from "yup";
import { ReleaseRewardFormValues, RewardTarget } from "@/types/benefits/rewards";
import { groupTargetSchema, personalTargetSchema } from "@/utils/validation/benefits/common";

export const baseRewardSchema = {
	name: yup.string().required('보상명을 입력해주세요.'),
	amount: yup.number().min(1, '1 이상의 값을 입력해주세요.').required(),
	alimTalk: yup.boolean().required(),
};

export const getRewardSchemaByTarget = (type: RewardTarget): yup.ObjectSchema<ReleaseRewardFormValues> => {
	if (type === 'GROUP') {
		return yup.object({
			...baseRewardSchema,
			...groupTargetSchema,
		}) as yup.ObjectSchema<ReleaseRewardFormValues>;
	} else {
		return yup.object({
			...baseRewardSchema,
			...personalTargetSchema,
		}) as yup.ObjectSchema<ReleaseRewardFormValues>;
	}
};

export const defaultValues: ReleaseRewardFormValues = {
	name: '',
	amount: 0,
	alimTalk: false,
	memberIdList: [],
	subscribe: false,
	longUnconnected: false,
	gradeList: [],
	area: 'ALL',
	birthYearFrom: '',
	birthYearTo: '',
};