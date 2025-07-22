import { GradeType, Page } from "@/types/common";
import { OrderStatus } from "@/types/sales";
import { ORDER_TYPE_LABEL_MAP } from "@/constants/sales";

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
	allianceId: string;
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
}