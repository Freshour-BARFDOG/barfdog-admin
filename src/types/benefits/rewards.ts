import { Page } from "@/types/common";
import { REWARD_STATUS, REWARD_TARGET, REWARD_TYPE } from "@/constants/benefits/rewards";
import { FormValueFilter, GroupFilter, PersonalFilter } from "@/types/benefits/common";

type RewardType = keyof typeof REWARD_TYPE;
type RewardStatus = keyof typeof REWARD_STATUS;

interface RewardListData {
	id: number;
	createdDate: string;
	name: string;
	rewardStatus: string;
	amount: number;
	memberName: string;
	email: string;
	rewardType: string;
	issuerName: string | null;
	issuerEmail: string | null;
}

interface RewardListResponse {
	rewardList: RewardListData[];
	page: Page;
}

interface RewardListSearchParams {
	email: string;
	name: string;
	from: string;
	to: string;
	rewardTypeList: RewardType[];
}

type RewardTarget = keyof typeof REWARD_TARGET;

interface ReleaseRewardFormValues extends FormValueFilter {
	name: string;
	amount: number;
	alimTalk: boolean;
}

type PersonalRewardBody = Omit<ReleaseRewardFormValues, keyof PersonalFilter> & PersonalFilter;
type GroupRewardBody = Omit<ReleaseRewardFormValues, keyof GroupFilter> & GroupFilter;
type ReleaseRewardRequestBody = PersonalRewardBody | GroupRewardBody;

export type {
	RewardStatus,
	RewardType,
	RewardListData,
	RewardListResponse,
	RewardListSearchParams,
	RewardTarget,
	ReleaseRewardFormValues,
	ReleaseRewardRequestBody,
}