import { toLabelValueList } from "@/utils/toLabelValueList";

const BANNER_TARGET = {
	ALL: '전체',
	SUBSCRIBER: '구독회원',
	USER: '회원',
	GUEST: '비회원',
} as const;

const BANNER_TARGET_LIST = toLabelValueList(BANNER_TARGET);

const POPUP_POSITION = {
	LEFT: '왼쪽',
	MID: '중간',
	RIGHT: '오른쪽',
} as const;

const POPUP_POSITION_LIST = toLabelValueList(POPUP_POSITION);

export {
	BANNER_TARGET,
	BANNER_TARGET_LIST,
	POPUP_POSITION,
	POPUP_POSITION_LIST,
}