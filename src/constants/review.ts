import { OLDEST_DATE, TODAY } from "@/constants/common";
import { toLabelValueList } from "@/utils/toLabelValueList";
import { ReviewActionMeta, ReviewActionPayloadMap, ReviewActionType } from "@/types/review";

const REVIEW_LIST_INITIAL_SEARCH_VALUES = {
	from: OLDEST_DATE,
	to: TODAY,
	order: 'desc',
	status: 'ALL',
} as const;

const REVIEW_STATUS = {
	ALL: '전체',
	REQUEST: '요청',
	RETURN: '반려',
	APPROVAL: '승인',
	ADMIN: '관리자',
} as const;

const REVIEW_STATUS_LIST = toLabelValueList(REVIEW_STATUS);

const REVIEW_ACTION_LABEL_MAP: Record<ReviewActionType, string> = {
	approve: '승인',
	selectBest: '베스트 리뷰 선정',
	delete: '삭제',
	deleteBest: '베스트 리뷰 해제',
	reject: '반려',
	reorderBest: '순서 편집',
};

const REVIEW_ACTION_MAP: {
	[K in keyof ReviewActionPayloadMap]: ReviewActionMeta<ReviewActionPayloadMap[K]>;
} = {
	approve: {
		method: 'put',
		getUrl: () => '/api/admin/reviews/approval',
		getBody: ({ ids }) => ({ reviewIdList: ids }),
	},
	selectBest: {
		method: 'post',
		getUrl: () => '/api/admin/reviews/best',
		getBody: ({ ids }) => ({ reviewIdList: ids }),
	},
	delete: {
		method: 'delete',
		getUrl: (payload) => `/api/admin/reviews/${payload.ids[0]}`,
	},
	deleteBest: {
		method: 'delete',
		getUrl: (payload) => `/api/admin/reviews/${payload.ids[0]}/best`,
	},
	reject: {
		method: 'put',
		getUrl: (payload) => `/api/admin/reviews/${payload.ids[0]}/return`,
		getBody: ({ reason }) => ({ returnReason: reason }),
	},
	reorderBest: {
		method: 'put',
		getUrl: () => `/api/admin/reviews/best/leakedOrder`,
		getBody: ({ leakedOrderDtoList }) => ({ leakedOrderDtoList }),
	},
};

export {
	REVIEW_LIST_INITIAL_SEARCH_VALUES,
	REVIEW_STATUS,
	REVIEW_STATUS_LIST,
	REVIEW_ACTION_LABEL_MAP,
	REVIEW_ACTION_MAP,
}