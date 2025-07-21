import { OLDEST_DATE, TODAY } from "@/constants/common";
import { toLabelValueList } from "@/utils/toLabelValueList";

const ARTICLE_CATEGORY = {
	NUTRITION: '영양',
	HEALTH: '건강',
	LIFE: '생애',
} as const;

const ARTICLE_CATEGORY_LIST = toLabelValueList(ARTICLE_CATEGORY);

const INQUIRY_STATUS = {
	ALL: '전체',
	UNANSWERED: '답변대기',
	ANSWERED: '답변완료',
	MULTIPLE_ANSWERED: '추가답변',
}

const INQUIRY_STATUS_LIST = toLabelValueList(INQUIRY_STATUS);

const INQUIRY_CATEGORY = {
	GENERAL: '일반문의',
	REFUND: '반품/환불',
	ERROR_REPORTING: '오류보고',
}

const INQUIRY_CATEGORY_LIST = toLabelValueList(INQUIRY_CATEGORY);

const INQUIRY_LIST_INITIAL_SEARCH_VALUES = {
	type: 'title',
	value: ' ',
	answerStatus: 'ALL',
	from: OLDEST_DATE,
	to: TODAY,
} as const;

export {
	ARTICLE_CATEGORY,
	ARTICLE_CATEGORY_LIST,
	INQUIRY_STATUS,
	INQUIRY_STATUS_LIST,
	INQUIRY_CATEGORY,
	INQUIRY_CATEGORY_LIST,
	INQUIRY_LIST_INITIAL_SEARCH_VALUES,
}