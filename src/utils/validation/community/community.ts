import * as yup from "yup";

export const noticeSchema = yup.object().shape({
	title: yup
		.string()
		.required('제목은 필수입니다.'),
	contents: yup
		.string()
		.required('콘텐츠는 필수입니다.'),
	status: yup
		.string()
		.oneOf(['LEAKED', 'HIDDEN'], '유효한 공지사항 상태여야 합니다.')
		.required('상태는 필수입니다.'),
});
