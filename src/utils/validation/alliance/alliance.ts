import * as yup from "yup";

export const allianceSchema = yup.object().shape({
	allianceName: yup
		.string()
		.required('제목은 필수입니다.'),
	allianceCode: yup
		.string()
		.matches(/^[a-zA-Z]{0,2}$/, '영문자 2글자 이내로 입력해주세요')
		.required('필수 입력 항목입니다'),
});
