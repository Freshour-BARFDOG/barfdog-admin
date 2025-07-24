import { PromotionStatus, PromotionType } from "@/types/benefits/promotions";
import { toLabelValueList } from "@/utils/toLabelValueList";

const PROMOTION_STATUS = {
	PAUSED: '대기',
	ACTIVE: '진행중',
	INACTIVE: '종료',
} as const;

const PROMOTION_STATUS_LIST = toLabelValueList(PROMOTION_STATUS);

const PROMOTION_LIST_INITIAL_SEARCH_VALUES = {
	promotionType: 'COUPON' as PromotionType,
	name: '',
	statusList: ['PAUSED', 'ACTIVE', 'INACTIVE'] as PromotionStatus[],
};

const PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES = {
	name: '',
	email: '',
};

export {
	PROMOTION_STATUS,
	PROMOTION_STATUS_LIST,
	PROMOTION_LIST_INITIAL_SEARCH_VALUES,
	PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES,
};