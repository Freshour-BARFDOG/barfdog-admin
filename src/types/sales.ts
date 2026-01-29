import { Pagination } from "./common";

interface SearchSalesRequest {
  fromDate: string; // yyyy-MM-dd
  toDate: string; // yyyy-MM-dd
  merchantUid: string | null; // 주문번호
  memberName: string | null; // 구매자 이름
  memberEmail: string | null; // 구매자 이메일(로그인 아이디)
  statusList: OrderStatus[] | null;
  orderType: OrderTypeRequest;
}

interface SearchSalesParams {
  /** body 에는 검색 필터값 전부 */
  body: SearchSalesRequest;
  /** 0부터 시작하는 페이지 번호 (기본값 0) */
  page?: number;
  /** 페이지당 사이즈 (기본값 50) */
  size?: number;
}

type SalesSearchCategory = Exclude<
  keyof SearchSalesRequest,
  "fromDate" | "toDate" | "statusList" | "orderType" // 이 필드들은 검색 키가 아니므로 제외
>;

interface SearchSalesData {
  orderId: number;
  orderType: OrderTypeResponse;
  merchantUid: string;
  // 회원 정보
  memberName: string;
  memberEmail: string;
  memberPhoneNumber: string;
  // 수령인 정보
  recipientName: string;
  recipientPhoneNumber: string;
  // 주문/배송 상태
  orderStatus: OrderStatus;
  deliveryStatus: OrderStatus;
  // 배송 관련
  isPackage: boolean;
  deliveryCode: string | null;
  deliveryNumber: string | null;
  transUniqueCd: string | null; // 거래 고유 코드
  // 날짜
  createdDate: string; // yyyy-MM-dd HH:mm:ss
  paymentDate: string | null;
}

interface SearchSalesResult {
  pagination: Pagination;
  orders: SearchSalesData[];
}

interface SalesBaseRow {
  /** 주문 고유 ID (상세조회 링크 등에 사용) */
  orderId: number;
  /** 주문번호 (merchantUid) */
  merchantUid: string;
  /** 주문 상태 */
  orderStatus: OrderStatus;
  /** 구매자 아이디 (email) */
  memberEmail: string;
  /** 구매자 이름 */
  memberName: string;
  /** 수령인 이름 */
  recipientName: string;
  /** 묶음배송 여부 */
  isPackage: boolean;
  orderType: OrderTypeResponse;
}

interface SalesDeliveryRow extends SalesBaseRow {
  /** 실제 배송 상태 */
  deliveryStatus: OrderStatus;
  /** 택배사 코드 혹은 이름 */
  courier: string;
  /** 운송장 번호 */
  trackingNumber: string;
}

// ─── 주문 상세 공통 타입 (v2 API) ────────────────────────────────────

/** 주문 상세 - 주문 정보 */
interface OrderDetailInfo {
  orderId: number;
  merchantUid: string;
  paymentDate: string; // yyyy-MM-dd HH:mm:ss
  orderType: OrderTypeResponse;
  memberName: string;
  memberPhoneNumber: string;
  memberEmail: string | null;
  orderStatus: OrderStatus;
  orderConfirmDate: string | null;
  cancelReason: string | null;
  cancelDetailReason: string | null;
  cancelRequestDate: string | null;
  cancelConfirmDate: string | null;
  package: boolean;
}

/** 주문 상세 - 주문 상품 */
interface OrderItemDetail {
  orderItemId: number;
  orderItemName: string;
  amount: number;
  salePrice: number;
  itemOptionList: ItemOption[] | null;
}

interface ItemOption {
  optionId: number;
  optionName: string;
  optionAmount: number;
  optionPrice: number;
}

/** 주문 상세 - 결제 정보 */
interface PaymentDetailInfo {
  orderPrice: number;
  paymentPrice: number;
  discountGrade: number;
  discountReward: number;
  couponName: string | null;
  discountCoupon: number;
  overDiscount: number;
  deliveryPrice: number;
  paymentMethod: PaymentMethod;
  impUid: string | null;
}

/** 주문 상세 - 배송 정보 */
interface DeliveryDetailInfo {
  trackingNumber: string | null;
  carrierCode: string | null;
  deliveryName: string | null;
  recipientName: string;
  phoneNumber: string;
  street: string;
  detailAddress: string;
  request: string | null;
  departureDateTime: string | null;
  arrivalDateTime: string | null;
}

// ─── 일반 주문 상세 ────────────────────────────────────

interface SalesDetailGeneralResponse {
  orderInfo: OrderDetailInfo;
  orderItemList: OrderItemDetail[];
  paymentInfo: PaymentDetailInfo;
  deliveryInfo: DeliveryDetailInfo;
}

// ─── 구독 주문 상세 (v2 API) ────────────────────────────────────

interface RecipeInfo {
  name: string;
  pricePerGram: number;
}

/** 구독 상세 - 구독 정보 */
interface SubscribeDetailInfo {
  subscribeId: number;
  petName: string;
  subscribeCount: number;
  plan: string;
  recipeInfoList: RecipeInfo[];
}

/** 구독 상세 - 결제 정보 (PaymentDetailInfo + customerUid) */
interface SubscribePaymentInfo extends PaymentDetailInfo {
  customerUid: string;
}

interface SalesDetailSubscribeResponse {
  orderInfo: OrderDetailInfo;
  subscribeInfo: SubscribeDetailInfo;
  paymentInfo: SubscribePaymentInfo;
  deliveryInfo: DeliveryDetailInfo;
}

interface SalesRecipient {
  zipcode: string;
  street: string;
  detailAddress: string;
  name: string;
  phone: string;
}

interface UpdateSalesDeliveryRequest {
  recipient: SalesRecipient;
  request: string | null;
}

type OrderStatus =
  // — 통합 목록 조회 (status 미포함 검색 시 ALL)
  | "ALL" // 전체
  | "HOLD" // 구독 보류
  | "BEFORE_PAYMENT" // 결제 전
  | "RESERVED_PAYMENT" // 예약됨
  | "CANCEL_PAYMENT" // 결제 취소
  | "CANCEL_RESERVED_PAYMENT" // 예약결제 취소

  // — 주문 목록 조회
  | "PAYMENT_DONE" // 결제 완료
  | "PRODUCING" // 생산 중 (구독 상품)
  | "DELIVERY_READY" // 배송 준비 중 (일반 상품)
  | "FAILED" // 실패함 (결제 실패)

  // — 취소 목록 조회
  | "CANCEL_REQUEST" // 취소 요청
  | "CANCEL_DONE_SELLER" // 취소 완료 (판매자 귀책)
  | "CANCEL_DONE_BUYER" // 취소 완료 (구매자 귀책)

  // — 배송 현황 목록 조회
  | "DELIVERY_BEFORE_COLLECTION" // 배송 예정
  | "DELIVERY_START" // 배송 시작
  | "DELIVERY_DONE" // 배송 완료

  // — 통합 목록 조회 중 구독결제 취소
  | "DELIVERY_CANCEL" // 구독결제 취소

  // — 통합 목록 조회 중 반품/교환
  | "RETURN_REQUEST" // 반품 요청
  | "RETURN_DONE_SELLER" // 반품 완료 (판매자 귀책)
  | "RETURN_DONE_BUYER" // 반품 완료 (구매자 귀책)
  | "EXCHANGE_REQUEST" // 교환 요청
  | "EXCHANGE_DONE_SELLER" // 교환 완료 (판매자 귀책)
  | "EXCHANGE_DONE_BUYER" // 교환 완료 (구매자 귀책)
  | "FAILED_RESERVED_PAYMENT" // 예약결제 실패 (통합 목록 조회)

  // — 구매 확정 목록 조회
  | "CONFIRM"; // 구매 확정

type OrderTypeResponse = "GENERAL" | "SUBSCRIBE";
type OrderTypeRequest = "ALL" | "GENERAL" | "SUBSCRIBE";
type PaymentMethod = "CREDIT_CARD" | "NAVER_PAY" | "KAKAO_PAY";
type PurchaseType = Exclude<OrderTypeRequest, "ALL">;

export type {
  OrderStatus,
  SearchSalesData,
  SearchSalesRequest,
  SearchSalesResult,
  SalesDeliveryRow,
  SalesBaseRow,
  SalesSearchCategory,
  SearchSalesParams,
  SalesDetailGeneralResponse,
  OrderDetailInfo,
  OrderItemDetail,
  ItemOption,
  PaymentDetailInfo,
  DeliveryDetailInfo,
  OrderTypeResponse,
  OrderTypeRequest,
  SalesDetailSubscribeResponse,
  SubscribeDetailInfo,
  SubscribePaymentInfo,
  RecipeInfo,
  PaymentMethod,
  SalesRecipient,
  UpdateSalesDeliveryRequest,
  PurchaseType,
};
