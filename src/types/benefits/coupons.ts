import { Page } from "@/types/common";
import {
	COUPON_TARGET,
	COUPON_TYPE,
	MEMBER_COUPON_ROLE,
	RELEASE_COUPON_TARGET,
	RELEASE_COUPON_TYPE
} from "@/constants/benefits/coupons";
import { DISCOUNT_UNIT_TYPE } from "@/constants/common";
import { FormValueFilter, GroupFilter, PersonalFilter } from "@/types/benefits/common";

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

interface ReleaseCouponBaseFormValues {
	couponType: ReleaseCouponType;
	couponId: number | null;
	expiredDate: string;
	alimTalk: boolean;
}

interface ReleaseCouponFormValues extends ReleaseCouponBaseFormValues, FormValueFilter {}

type PersonalCouponBody = ReleaseCouponBaseFormValues & PersonalFilter;
type GroupCouponBody = ReleaseCouponBaseFormValues & GroupFilter;
type AllCouponBody = ReleaseCouponBaseFormValues;

type ReleaseCouponRequestBody = PersonalCouponBody | GroupCouponBody | AllCouponBody;
// --------------------------------------------------

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