import * as yup from "yup";

const isContentEmpty = (value: string) => {
	if (!value) return false;

	// 이미지 태그가 하나라도 있으면 콘텐츠가 있다고 판단
	const hasImage = /<img\s+[^>]*src=/.test(value);
	if (hasImage) return true;

	const cleaned = value
		.replace(/<p><br><\/p>/g, '')
		.replace(/<[^>]*>/g, '') // 모든 HTML 태그 제거
		.replace(/&nbsp;/g, '')
		.trim();

	return cleaned.length > 0;
};

export const noticeSchema = yup.object().shape({
	title: yup
		.string()
		.required('제목은 필수입니다.'),
	contents: yup
		.string()
		.test('not-empty', '콘텐츠는 필수입니다.', function (value) {
			if (typeof value !== 'string') return false;
			return isContentEmpty(value);
		})
		.required('콘텐츠는 필수입니다.'),
	status: yup
		.string()
		.oneOf(['LEAKED', 'HIDDEN'], '유효한 공지사항 상태여야 합니다.')
		.required('상태는 필수입니다.'),
});


export const articleSchema = yup.object().shape({
	title: yup
		.string()
		.required('제목은 필수입니다.'),
	contents: yup
		.string()
		.test('not-empty', '콘텐츠는 필수입니다.', function (value) {
			if (typeof value !== 'string') return false;
			return isContentEmpty(value);
		})
		.required('콘텐츠는 필수입니다.'),
	thumbnailId: yup
		.number()
		.required('썸네일은 필수입니다.'),
	status: yup
		.string()
		.oneOf(['LEAKED', 'HIDDEN'], '유효한 아티클 상태여야 합니다.')
		.required('상태는 필수입니다.'),
	category: yup
		.string()
		.oneOf(['NUTRITION', 'HEALTH', 'LIFE'], '유효한 아티클 카테고리여야 합니다.')
		.required('상태는 필수입니다.'),
});
