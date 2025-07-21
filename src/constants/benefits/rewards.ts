import { OLDEST_DATE, TODAY } from "@/constants/common";
import { RewardTarget } from "@/types/benefits/rewards";
import { SelectOption } from "@/types/common";
import { toLabelValueList } from "@/utils/toLabelValueList";

const REWARD_STATUS = {
	SAVED: '+',
	USED: '-',
} as const;

const REWARD_TYPE = {
	RECOMMEND: '친구추천',
	FRIEND_PAY: '친구첫구매',
	REVIEW: '리뷰',
	EVENT: '이벤트',
	ORDER: '주문',
	SUBSCRIBE: '구독',
	ADMIN: '관리자',
	RECEIVE: '수신동의',
} as const;

const REWARD_TYPE_LIST = toLabelValueList(REWARD_TYPE);

const REWARD_LIST_INITIAL_SEARCH_VALUES = {
	email: '',
	name: '',
	from: OLDEST_DATE,
	to: TODAY,
	rewardTypeList: [],
};

const REWARD_TARGET = {
	GROUP: '그룹',
	PERSONAL: '개인',
} as const;


const REWARD_TARGET_LIST: SelectOption<RewardTarget>[] =
  (Object.entries(REWARD_TARGET) as [RewardTarget, string][]).map(
    ([value, label]) => ({ label, value })
  );

export {
	REWARD_STATUS,
	REWARD_TYPE,
	REWARD_TYPE_LIST,
	REWARD_LIST_INITIAL_SEARCH_VALUES,
	REWARD_TARGET,
	REWARD_TARGET_LIST,
};