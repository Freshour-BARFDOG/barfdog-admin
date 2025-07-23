import { GradeType, Page } from "@/types/common";
import { OrderStatus } from "@/types/sales";
import { ORDER_TYPE_LABEL_MAP } from "@/constants/sales";
import { ALLIANCE_COUPON_STATUS, ALLIANCE_COUPON_TARGET, ALLIANCE_COUPON_SEARCH_TYPE } from "@/constants/alliance";

// ------------------------------------------------------------
type AllianceType = 'cb';

interface AllianceListSearchParams {
	from: string;
	to: string;
}

interface AllianceMemberListData {
	id: number;
	grade: GradeType;
	name: string;
	email: string;
	phoneNumber: string;
	dogName: null | string;
	accumulatedAmount: number;
	subscribe: boolean;
	longUnconnected: boolean;
	alliance: string;
}

// ------------------------------------------------------------
interface AllianceMemberListResponse {
	page: Page;
	memberList: AllianceMemberListData[];
}

// ------------------------------------------------------------
interface AllianceMemberSalesData {
	orderConfirmDate: null | string;
	paymentDate: string;
	orderStatus: OrderStatus;
	orderId: number;
	email: string;
	merchantUid: string;
	orderPrice: number;
	deliveryPrice: number;
	discountCoupon: number;
	discountGrade: number;
	discountReward: number;
	discountTotal: number;
	paymentPrice: number;
	alliance: AllianceType;
	allianceDiscount: number;
	dtype: keyof typeof ORDER_TYPE_LABEL_MAP;
}

interface AllianceManagementSearchParams {
	allianceName: string;
}

interface EventInfos {
	allianceEventId: number;
	eventName: string;
}

interface ExtendedAllianceData {
	allianceId: number;
	allianceCode: string;
	allianceName: string;
	eventInfos: EventInfos[];
}

interface AllianceManagementData extends ExtendedAllianceData {
	eventCount: number;
	createdCouponCount: number;
	registeredCount: number;
	usedCount: number;
}

interface AllianceManagementResponse {
	page: Page;
	managementList: AllianceManagementData[];
}

interface AllianceManagementFormValues {
	allianceName: string;
	allianceCode: string;
	eventNameList: string[];
}

// ------------------------------------------------------------
interface AllianceDetailInfo extends AllianceManagementFormValues {
	createdCouponCount: number;
}

interface AllianceCouponUsedInfo {
	registeredCouponCount: number;
	usedCouponCount: number;
	generalItemCount: number;
	subscriptionItemCount: number;
}

interface AllianceEventInfo {
	allianceEventId: number;
	createdEventDate: string;
	eventName: string;
	eventCouponCreatedCount: number;
	eventCouponRegisteredCount: number;
	eventUsedCount: number;
	eventGeneralItemCount: number;
	eventSubscriptionItemCount: number;
}

interface AllianceDetailResponse {
	allianceInfo: AllianceDetailInfo;
	allianceCouponUsedInfo: AllianceCouponUsedInfo;
	allianceEventInfoList: AllianceEventInfo[];
}

interface CreateAllianceEvent {
	allianceEventName: string;
	allianceId: number;
}

// ------------------------------------------------------------
type AllianceCouponStatus = keyof typeof ALLIANCE_COUPON_STATUS;
type AllianceCouponTarget = keyof typeof ALLIANCE_COUPON_TARGET;
type AllianceCouponSearchType = keyof typeof ALLIANCE_COUPON_SEARCH_TYPE;

interface AllianceCouponListSearchParams {
	from: string;
	to: string;
	status: AllianceCouponStatus;
	couponTarget: AllianceCouponTarget;
	searchType: AllianceCouponSearchType;
	search: string;
}

interface AllianceCouponData {
	allianceId: number;
	allianceEventId: number;
	allianceName: string;
	eventName: string;
	couponName: string;
	discountDegree: string;
	couponCount: number;
	useStartDate: string;
	useExpiredDate: string;
	registrationCount: number;
	usedCount: number;
	bundle: string;
}

interface AllianceCouponListResponse {
	page: Page;
	couponList: AllianceCouponData[];
}

interface AllianceCouponInfo {
	createdCouponDate: string;
	allianceName: string;
	eventName: string;
	couponName: string;
	couponDescription: string;
	couponTarget: AllianceCouponTarget;
	discountDegree: string;
	availableMaxDiscount: number;
	availableMinPrice: number;
	couponCount: number;
	couponCodeLength: number;
	useStartDate: string;
	useExpiredDate: string;
}

interface AllianceCouponUsedHistoryInfo extends Omit<AllianceCouponUsedInfo, 'registeredCouponCount'> {
	couponCreatedCount: number;
}

interface AllianceCouponDetailResponse {
	couponInfo: AllianceCouponInfo;
	couponUsedHistory: AllianceCouponUsedHistoryInfo;
}

interface ExcelDownloadAllianceCoupon {
	allianceCouponBundle: string;
	couponStatus: AllianceCouponStatus;
}

export type {
	AllianceListSearchParams,
	AllianceMemberListData,
	AllianceMemberListResponse,
	AllianceMemberSalesData,
	AllianceManagementSearchParams,
	ExtendedAllianceData,
	AllianceManagementData,
	AllianceManagementResponse,
	AllianceManagementFormValues,
	AllianceDetailInfo,
	AllianceCouponUsedInfo,
	AllianceEventInfo,
	AllianceDetailResponse,
	CreateAllianceEvent,
	AllianceCouponStatus,
	AllianceCouponTarget,
	AllianceCouponSearchType,
	AllianceCouponListSearchParams,
	AllianceCouponData,
	AllianceCouponListResponse,
	AllianceCouponDetailResponse,
	ExcelDownloadAllianceCoupon,
}