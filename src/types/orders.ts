import { Page } from "./common";

interface SearchOrdersRequest {
  from: string; // yyyy-MM-dd
  to: string; // yyyy-MM-dd
  merchantUid: string | null; // 주문번호
  memberName: string | null; // 구매자 이름
  memberEmail: string | null; // 구매자 이메일(로그인 아이디)
  recipientName: string | null; // 수령자 이름
  dogName: string | null; // 반려견 이름
  statusList: OrderStatus[] | null;
  orderType: OrderType;
}

interface SearchOrdersParams {
  /** body 에는 검색 필터값 전부 */
  body: SearchOrdersRequest;
  /** 0부터 시작하는 페이지 번호 (기본값 0) */
  page?: number;
  /** 페이지당 사이즈 (기본값 50) */
  size?: number;
}

type OrderSearchCategory = Exclude<
  keyof SearchOrdersRequest,
  "from" | "to" | "statusList" | "orderType" // 이 두 필드는 검색 키가 아니므로 제외
>;

interface SearchOrdersData {
  id: number;
  orderType: OrderType;
  merchantUid: string;
  // 회원 정보
  memberName: string;
  memberEmail: string;
  memberPhoneNumber: string;
  // 수령인 정보
  recipientName: string;
  recipientPhoneNumber: string;
  // 반려견 이름
  dogName: string;
  // 주문/배송 상태
  orderStatus: OrderStatus;
  deliveryStatus: OrderStatus;
  // 배송 관련
  packageDelivery: boolean;
  deliveryCode: string | null;
  deliveryNumber: string | null;
  transUniqueCd: string; // 거래 고유 코드
  // 취소 관련
  cancelReason: string | null;
  cancelDetailReason: string | null;
  // 날짜
  orderDate: string; // ISO 문자열
  createdDate: string; // ISO 문자열
}

interface SearchOrdersResult {
  page: Page;
  orders: SearchOrdersData[];
}

interface BaseOrderRow {
  /** 주문 고유 ID (상세조회 링크 등에 사용) */
  id: number;
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
  /** 반려견 이름 */
  dogName: string;
  /** 묶음배송 여부 */
  packageDelivery: boolean;
}

interface DeliveryOrderRow extends BaseOrderRow {
  /** 실제 배송 상태 */
  deliveryStatus: OrderStatus;
  /** 택배사 코드 혹은 이름 */
  courier: string;
  /** 운송장 번호 */
  trackingNumber: string;
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

type OrderType = "ALL" | "GENERAL" | "SUBSCRIBE";

export type {
  OrderStatus,
  OrderType,
  SearchOrdersData,
  SearchOrdersRequest,
  SearchOrdersResult,
  DeliveryOrderRow,
  BaseOrderRow,
  OrderSearchCategory,
  SearchOrdersParams,
};
