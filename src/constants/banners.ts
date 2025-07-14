
const BANNER_STATUS = {
	LEAKED: 'Y',
	HIDDEN: 'N',
} as const;

const BANNER_STATUS_LIST = (Object.entries(BANNER_STATUS)).map(
	([value, label]) => ({ label, value })
);

const BANNER_TARGET = {
	ALL: '전체',
	SUBSCRIBER: '구독회원',
	USER: '회원',
	GUEST: '비회원',
} as const;

const BANNER_TARGET_LIST = (Object.entries(BANNER_TARGET)).map(
	([value, label]) => ({ label, value })
);

const POPUP_POSITION = {
	LEFT: '왼쪽',
	MID: '중간',
	RIGHT: '오른쪽',
} as const;

const POPUP_POSITION_LIST = (Object.entries(POPUP_POSITION)).map(
	([value, label]) => ({ label, value })
);

export {
	BANNER_STATUS,
	BANNER_STATUS_LIST,
	BANNER_TARGET,
	BANNER_TARGET_LIST,
	POPUP_POSITION,
	POPUP_POSITION_LIST,
}