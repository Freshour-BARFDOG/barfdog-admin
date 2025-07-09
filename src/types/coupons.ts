import { Page } from "@/types/common";
import {
	COUPON_TARGET,
	COUPON_TYPE,
	MEMBER_COUPON_ROLE, RELEASE_COUPON_AREA,
	RELEASE_COUPON_TARGET,
	RELEASE_COUPON_TYPE
} from "@/constants/coupons";
import { DISCOUNT_UNIT_TYPE } from "@/constants/common";
import { GradeType } from "@/types/member";

interface CouponListData {
	id: number;
	name: string;
	couponType: string;
	code: string;
	description: string;
	discount: string;
	couponTarget: string;
	amount: number;
	expiredDate: null | string;
}

interface CouponListResponse {
	couponList: CouponListData[];
	page: Page;
}

interface CouponListSearchParams {
	keyword: string;
	couponType: keyof typeof COUPON_TYPE;
}
// --------------------------------------------------
interface MemberCouponListBody {
	createdDateFrom: string;
	createdDateTo: string;
	memberName: string;
	memberEmail: string;
	role: keyof typeof MEMBER_COUPON_ROLE;
}

interface MemberCouponListData {
	id: number;
	createdDate: string;
	expiredDate: string;
	memberCouponStatus: MemberCouponStatus;
	remaining: number;
	memberId: number;
	memberEmail: string;
	memberGrade: string;
	memberName: string;
	memberRole: string,
	couponId: number;
	couponName: string;
	amount: number;
	availableMaxDiscount: number;
	availableMinPrice: number;
	code: string;
	couponStatus: MemberCouponStatus;
	couponTarget: keyof typeof COUPON_TARGET;
	couponType: keyof typeof COUPON_TYPE;
	description: string;
	discountDegree: number;
	discountType: keyof typeof DISCOUNT_UNIT_TYPE;
	lastExpiredDate: string;
}

interface MemberCouponListResponse {
	memberCouponList: MemberCouponListData[];
	page: Page;
}

interface UpdateMemberCoupon {
	expiredDate: string;
	memberCouponStatus: MemberCouponStatus;
	remaining: number;
}

type MemberCouponStatus = 'ACTIVE' | 'INACTIVE';
// --------------------------------------------------

interface PublicationCouponListData {
	couponId: number;
	name: string;
	discount: string;
}

type ReleaseCouponTarget = keyof typeof RELEASE_COUPON_TARGET;
type ReleaseCouponType = keyof typeof RELEASE_COUPON_TYPE;
type ReleaseCouponArea = keyof typeof RELEASE_COUPON_AREA;

interface ReleaseCouponBaseFormValues {
	couponType: ReleaseCouponType;
	couponId: number | null;
	expiredDate: string;
	alimTalk: boolean;
}

type ReleaseCouponFormValues = ReleaseCouponBaseFormValues & {
	// PERSONAL
	memberIdList?: number[];

	// GROUP
	subscribe?: boolean;
	longUnconnected?: boolean;
	gradeList?: GradeType[];
	area?: ReleaseCouponArea;
	birthYearFrom?: string;
	birthYearTo?: string;
}

type PersonalCouponBody = ReleaseCouponBaseFormValues & {
	memberIdList: number[];
};

type GroupCouponBody = ReleaseCouponBaseFormValues & {
	subscribe: boolean;
	longUnconnected: boolean;
	gradeList: string[];
	area: string;
	birthYearFrom: string;
	birthYearTo: string;
};

type AllCouponBody = ReleaseCouponBaseFormValues;

type ReleaseCouponRequestBody =
	| PersonalCouponBody
	| GroupCouponBody
	| AllCouponBody;

// AUTO_PUBLISHED 제외
type CreateCouponType = Exclude<keyof typeof COUPON_TYPE, 'AUTO_PUBLISHED'>;

interface CreateCouponFormValues {
	name: string;
	description: string;
	couponTarget: keyof typeof COUPON_TARGET;
	code: string;
	couponType: CreateCouponType;
	discountDegree: number;
	discountType: keyof typeof DISCOUNT_UNIT_TYPE;
	availableMaxDiscount: number;
	availableMinPrice: number;
	amount: number;
}

export type {
	CouponListData,
	CouponListResponse,
	CouponListSearchParams,
	MemberCouponListBody,
	MemberCouponListData,
	MemberCouponListResponse,
	MemberCouponStatus,
	UpdateMemberCoupon,
	ReleaseCouponTarget,
	ReleaseCouponFormValues,
	ReleaseCouponType,
	ReleaseCouponRequestBody,
	PublicationCouponListData,
	CreateCouponType,
	CreateCouponFormValues,
}