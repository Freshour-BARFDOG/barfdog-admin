import * as yup from 'yup';
import { format } from "date-fns";

export const reviewSchema = yup.object().shape({
	type: yup
		.string()
		.oneOf(['ITEM', 'SUBSCRIBE'])
		.required('리뷰 타입은 필수입니다.'),
	id: yup
		.number()
		.nullable()
		.required('ID는 필수입니다.'),
	writtenDate: yup
		.string()
		.required('작성일은 필수입니다.'),
	star: yup
		.number()
		.min(1, '최소 별점은 1점입니다.')
		.max(5, '최대 별점은 5점입니다.')
		.required('별점은 필수입니다.'),
	contents: yup
		.string()
		.required('리뷰 내용을 입력해주세요.'),

	username: yup
		.string()
		.required('작성자 이름을 입력해주세요.'),
});

export const defaultReviewFormValues = {
	type: null,
	id: null,
	writtenDate: format(new Date(), 'yyyy-MM-dd'),
	star: 5,
	contents: '',
	username: '',
	reviewImageIdList: [],
};