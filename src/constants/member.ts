import { OLDEST_DATE, TODAY } from "@/constants/common";

const INITIAL_SEARCH_VALUES = {
	email: '',
	name: '',
	from: OLDEST_DATE,
	to: TODAY,
	subscribing: '',
	gradeList: [],
}

const SEARCH_STATUS = [
	{ label: '전체', value: '' },
	{ label: '구독', value: 'true' },
	{ label: '비구독', value: 'false' },
]

const SEARCH_GRADE_LIST = ['브론즈', '실버', '골드', '플래티넘', '다이아몬드', '더바프'];

export {
	INITIAL_SEARCH_VALUES,
	SEARCH_STATUS,
	SEARCH_GRADE_LIST,
}