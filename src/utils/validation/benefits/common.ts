import * as yup from "yup";

export const personalTargetSchema = {
	memberIdList: yup
		.array()
		.of(yup.number())
		.min(1, '최소 한 명 이상의 회원을 선택해주세요.')
		.required(),
};

export const groupTargetSchema = {
	subscribe: yup.boolean().required(),
	longUnconnected: yup.boolean().required(),
	gradeList: yup
		.array()
		.of(yup.string())
		.min(1, '등급을 선택해주세요.'),
	area: yup.string().required('지역을 선택해주세요.'),
	birthYearFrom: yup.string().default('').required(),
	birthYearTo: yup.string().default('').required(),
};
