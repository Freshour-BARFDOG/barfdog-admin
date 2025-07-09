import { Page } from "@/types/common";
import { GradeType } from "@/types/common";

interface MemberListSearchParams {
	email: string;
	name: string;
	from: string;
	to: string;
	subscribing: string;
	gradeList: GradeType[];
}

interface MemberListData {
	id: number;
	grade: GradeType;
	name: string;
	email: string;
	phoneNumber: string;
	dogName: string | null,
	accumulatedAmount: number;
	subscribe: boolean;
	longUnconnected: boolean;
	alliance: string;
}

interface AddressData {
	deliveryName: string | null;
	zipcode: string;
	city: string;
	street: string;
	detailAddress: string;
}

interface MemberDetailData {
	memberDto: {
		id: number;
		name: string;
		email: string;
		address: AddressData;
		phoneNumber: string;
		birthday: string;
		accumulatedAmount: number;
		grade: string;
		subscribe: boolean;
		accumulatedSubscribe: number;
		lastLoginDate: string;
		longUnconnected: boolean;
		withdrawal: boolean;
		alliance: null | string;
	},
	dogNames: string[];
}

interface MemberSubscriptionData {
	id: number;
	dogName: string;
	subscribeStartDate: string;
	subscribeCount: number;
	plan: string;
	amount: number;
	nextPaymentPrice: number;
	discountCoupon: number;
	discountGrade: number;
	nextPaymentDate: string;
	nextDeliveryDate: string;
	countSkipOneTime: number;
	countSkipOneWeek: number;
	cancelReason: null | string;
	inedibleFood: string;
	inedibleFoodEtc: string;
	caution: string;
}

interface MemberSubscriptionListResponse {
	data: MemberSubscriptionData;
	recipeNames: string[];
}

interface MemberListResponse {
	page?: Page;
	memberList: MemberListData[]
}

export type {
	GradeType,
	MemberListSearchParams,
	MemberListData,
	MemberListResponse,
	MemberDetailData,
	MemberSubscriptionData,
	MemberSubscriptionListResponse,
	AddressData,
}