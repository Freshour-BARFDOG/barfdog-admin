import { Page } from "@/types/common";
import { PROMOTION_STATUS } from "@/constants/benefits/promotions";
import { DISCOUNT_UNIT_TYPE } from "@/constants/common";
import { COUPON_TARGET, COUPON_TYPE } from "@/constants/benefits/coupons";

type PromotionStatus = keyof typeof PROMOTION_STATUS;

type PromotionType = 'COUPON';

interface PromotionCoupon {
	promotionCouponId: number;
	quantity: number;
	remaining: number;
	usedCount: number;
	couponId: number;
	code: string;
	name: string;
	couponTarget: keyof typeof COUPON_TARGET;
	discountDegree: number;
	discountType: keyof typeof DISCOUNT_UNIT_TYPE;
	availableMinPrice: number;
	availableMaxDiscount: number;
	amount: number;
}

interface PromotionData {
	promotionId: number;
	type: PromotionType;
	status: PromotionStatus;
	name: string;
	startDate: string;
	expiredDate: string;
}

type PromotionListData = PromotionData & PromotionCoupon;

interface PromotionListResponse {
	promotionList: PromotionListData[];
	page: Page;
}

interface PromotionListSearchParams {
	promotionType: PromotionType;
	name: string;
	statusList: PromotionStatus[];
}

interface PromotionDetailData {
	promotionId: number;
	promotionType: PromotionType;
	name: string;
	startDate: string;
	expiredDate: string;
	status: PromotionStatus;
	quantity: number;
	remaining: number;
	usedCount: number;
	couponId: number;
	couponType: keyof typeof COUPON_TYPE;
	couponName: string;
	description: string;
	code: string;
	amount: number;
	discountDegree: number;
	discountType: keyof typeof DISCOUNT_UNIT_TYPE;
	couponTarget: keyof typeof COUPON_TARGET;
	availableMinPrice: number;
	availableMaxDiscount: number;
	deleted: boolean;
}

interface PromotionMemberListSearchParams {
	email: string;
	name: string;
}

interface PromotionMemberListData {
	id: number;
	email: string;
	name: string;
	createdDate: string;
	expiredDate: string;
	status: PromotionStatus;
	remaining: number;
	amount: number;
	used: boolean;
}

interface PromotionMemberListResponse {
	promotionMemberList: PromotionMemberListData[];
	page: Page;
}

interface PromotionFormValues {
	promotionType: PromotionType;
	name: string;
	startDate: string;
	expiredDate: string;
	couponId: number | null;
	quantity: number;
	status: PromotionStatus;
}

interface PromotionCouponListData {
	couponId: number;
	name: string;
	discount: string;
}

interface PromotionCouponDetail {
	couponFullName: string;
	remaining: number;
	quantity: number;
}

export type {
	PromotionStatus,
	PromotionType,
	PromotionCoupon,
	PromotionData,
	PromotionListData,
	PromotionListResponse,
	PromotionListSearchParams,
	PromotionDetailData,
	PromotionMemberListSearchParams,
	PromotionMemberListData,
	PromotionMemberListResponse,
	PromotionFormValues,
	PromotionCouponListData,
	PromotionCouponDetail,
}