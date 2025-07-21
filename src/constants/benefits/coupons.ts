import { OLDEST_DATE, TODAY } from "@/constants/common";
import { ReleaseCouponTarget } from "@/types/benefits/coupons";
import { SelectOption } from "@/types/common";
import { toLabelValueList } from "@/utils/toLabelValueList";

const COUPON_TYPE = {
	AUTO_PUBLISHED: '자동 발행',
	CODE_PUBLISHED: '코드 쿠폰',
	GENERAL_PUBLISHED: '일반 쿠폰',
	PROMOTION_PUBLISHED: '프로모션',
} as const;

const COUPON_TYPE_LIST = toLabelValueList(COUPON_TYPE);

const COUPON_LIST_INITIAL_SEARCH_VALUES = {
	keyword: '',
	couponType: 'AUTO_PUBLISHED',
} as const;

const COUPON_TARGET = {
	ALL: '전체',
	SUBSCRIBE: '정기구독',
	GENERAL: '일반상품',
} as const;
// --------------------------------------------------

const MEMBER_COUPON_ROLE = {
	ALL: '전체',
	SUBSCRIBER: '구독',
	USER: '일반',
} as const;

const MEMBER_COUPON_ROLE_LIST = toLabelValueList(MEMBER_COUPON_ROLE);

const MEMBER_COUPON_SEARCH_CATEGORY = [
	{ label: '아이디', value: 'memberEmail' },
	{ label: '이름', value: 'memberName' },
]

const MEMBER_COUPON_LIST_INITIAL_SEARCH_VALUES = {
	createdDateFrom: OLDEST_DATE,
	createdDateTo: TODAY,
	memberName: '',
	memberEmail: '',
	role: 'ALL',
} as const;
// --------------------------------------------------

const RELEASE_COUPON_TARGET = {
	ALL: '전체',
	GROUP: '그룹',
	PERSONAL: '개인',
} as const;


const RELEASE_COUPON_TARGET_LIST: SelectOption<ReleaseCouponTarget>[] =
  (Object.entries(RELEASE_COUPON_TARGET) as [ReleaseCouponTarget, string][]).map(
    ([value, label]) => ({ label, value })
  );


const RELEASE_COUPON_TYPE = {
	CODE_PUBLISHED: '코드쿠폰',
	GENERAL_PUBLISHED: '일반쿠폰',
} as const;

const RELEASE_COUPON_TYPE_LIST = toLabelValueList(RELEASE_COUPON_TYPE);
// --------------------------------------------------

const CREATE_COUPON_TYPE_LIST = Object.entries(COUPON_TYPE)
	.filter(([key]) => key !== 'AUTO_PUBLISHED')
	.map(([value, label]) => ({ label, value }));

const CREATE_COUPON_TARGET_LIST = toLabelValueList(COUPON_TARGET);

export {
	COUPON_TYPE,
	COUPON_TYPE_LIST,
	COUPON_LIST_INITIAL_SEARCH_VALUES,
	COUPON_TARGET,
	MEMBER_COUPON_ROLE,
	MEMBER_COUPON_ROLE_LIST,
	MEMBER_COUPON_SEARCH_CATEGORY,
	MEMBER_COUPON_LIST_INITIAL_SEARCH_VALUES,
	RELEASE_COUPON_TARGET,
	RELEASE_COUPON_TARGET_LIST,
	RELEASE_COUPON_TYPE,
	RELEASE_COUPON_TYPE_LIST,
	CREATE_COUPON_TYPE_LIST,
	CREATE_COUPON_TARGET_LIST,
}