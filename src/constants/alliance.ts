import { OLDEST_DATE, TODAY } from "@/constants/common";
import { AllianceCouponSearchType, AllianceCouponStatus, AllianceCouponTarget } from "@/types/alliance";
import { toLabelValueList } from "@/utils/toLabelValueList";

const INITIAL_ALLIANCE_SEARCH_VALUES = {
	from: OLDEST_DATE,
	to: TODAY,
}

const INITIAL_MANAGEMENT_SEARCH_VALUES = {
	allianceName: '',
}

const PAYMENT_API_KEY = 'SycrZhi9CuVrHei';

const ALLIANCE_NAMES = {
	cb: '콕뱅크',
}

const ALLIANCE_COUPON_STATUS = {
	ACTIVE: '활성',
	INACTIVE: '삭제',
} as const;

const ALLIANCE_COUPON_TARGET = {
	ALL: '전체',
	GENERAL: '일반',
	SUBSCRIBE: '구독',
} as const;

const ALLIANCE_COUPON_TARGET_LIST = toLabelValueList(ALLIANCE_COUPON_TARGET);

const ALLIANCE_COUPON_SEARCH_TYPE = {
	ALLIANCE: '제휴사',
	EVENT: '행사',
	ALLIANCE_COUPON_NAME: '쿠폰이름',
} as const;

const ALLIANCE_COUPON_SEARCH_TYPE_LIST = toLabelValueList(ALLIANCE_COUPON_SEARCH_TYPE);

const INITIAL_COUPON_SEARCH_VALUES = {
	from: OLDEST_DATE,
	to: TODAY,
	status: 'ACTIVE' as AllianceCouponStatus, 
	couponTarget: 'ALL' as AllianceCouponTarget,
	searchType: 'ALLIANCE' as AllianceCouponSearchType,
	search: '',
}

export {
	INITIAL_ALLIANCE_SEARCH_VALUES,
	INITIAL_MANAGEMENT_SEARCH_VALUES,
	INITIAL_COUPON_SEARCH_VALUES,
	PAYMENT_API_KEY,
	ALLIANCE_NAMES,
	ALLIANCE_COUPON_STATUS,
	ALLIANCE_COUPON_TARGET,
	ALLIANCE_COUPON_TARGET_LIST,
	ALLIANCE_COUPON_SEARCH_TYPE,
	ALLIANCE_COUPON_SEARCH_TYPE_LIST,
}