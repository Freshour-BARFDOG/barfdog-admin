const INITIAL_SEARCH_VALUES = {
	size: 10,
	email: '',
	name: '',
	from: '2000-01-01',
	to: '2025-06-25',
	subscribing: '',
	gradeList: [],
}

const SEARCH_CATEGORY = [
	{ label: '아이디', value: 'email' },
	{ label: '이름', value: 'name' },
]

const SEARCH_STATUS = [
	{ label: '전체', value: '' },
	{ label: '구독', value: 'true' },
	{ label: '비구독', value: 'false' },
]

const SEARCH_GRADE_LIST = ['브론즈', '실버', '골드', '플래티넘', '다이아몬드', '더바프'];

export {
	INITIAL_SEARCH_VALUES,
	SEARCH_CATEGORY,
	SEARCH_STATUS,
	SEARCH_GRADE_LIST,

}