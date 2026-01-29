import { SelectOption } from "@/types/common";
import {
  SalesSearchCategory,
  OrderStatus,
  OrderTypeRequest,
  OrderTypeResponse,
  PaymentMethod,
  PurchaseType,
} from "@/types/sales";
import { OLDEST_DATE, TODAY } from "./common";

const INITIAL_SEARCH_REQUEST = {
  fromDate: OLDEST_DATE,
  toDate: TODAY,
  merchantUid: null, // 주문번호
  memberName: null, // 구매자 이름
  memberEmail: null, // 구매자 이메일(로그인 아이디)
  statusList: null,
  orderType: "ALL" as OrderTypeRequest,
};

const INITIAL_ORDERS_REQUEST = {
  fromDate: OLDEST_DATE,
  toDate: TODAY,
  merchantUid: null, // 주문번호
  memberName: null, // 구매자 이름
  memberEmail: null, // 구매자 이메일(로그인 아이디)
  statusList: ["PAYMENT_DONE"] as OrderStatus[],
  orderType: "ALL" as OrderTypeRequest,
};

const INITIAL_CANCEL_REQUEST = {
  fromDate: OLDEST_DATE,
  toDate: TODAY,
  merchantUid: null, // 주문번호
  memberName: null, // 구매자 이름
  memberEmail: null, // 구매자 이메일(로그인 아이디)
  statusList: ["CANCEL_REQUEST"] as OrderStatus[],
  orderType: "ALL" as OrderTypeRequest,
};

const INITIAL_DELIVERY_REQUEST = {
  fromDate: OLDEST_DATE,
  toDate: TODAY,
  merchantUid: null, // 주문번호
  memberName: null, // 구매자 이름
  memberEmail: null, // 구매자 이메일(로그인 아이디)
  statusList: ["DELIVERY_BEFORE_COLLECTION"] as OrderStatus[],
  orderType: "ALL" as OrderTypeRequest,
};

const SALES_SEARCH_CATEGORY: {
  label: string;
  value: SalesSearchCategory;
}[] = [
  { label: "구매자 이름", value: "memberName" },
  { label: "구매자 ID", value: "memberEmail" },
  { label: "주문번호", value: "merchantUid" },
];

const SALES_ORDER_TYPE: {
  label: string;
  value: OrderTypeRequest;
}[] = [
  { label: "전체", value: "ALL" },
  { label: "일반", value: "GENERAL" },
  { label: "구독", value: "SUBSCRIBE" },
];

const ORDER_TYPE_LABEL_MAP: Record<OrderTypeResponse, string> = {
  GENERAL: "일반",
  SUBSCRIBE: "구독",
};

const PRODUCT_TYPE: Record<PurchaseType, string> = {
  GENERAL: "GENERAL",
  SUBSCRIBE: "SUBSCRIBE",
};

const ORDER_STATUS: SelectOption<OrderStatus>[] = [
  { value: "ALL", label: "전체" },
  { value: "HOLD", label: "구독 보류" },
  { value: "BEFORE_PAYMENT", label: "결제 전" },
  { value: "RESERVED_PAYMENT", label: "예약됨" },
  { value: "CANCEL_PAYMENT", label: "결제 취소" },
  { value: "CANCEL_RESERVED_PAYMENT", label: "예약결제 취소" },
  { value: "PAYMENT_DONE", label: "결제 완료" },

  { value: "PRODUCING", label: "생산 중" }, // 구독 상품
  { value: "DELIVERY_READY", label: "배송 준비 중" }, // 일반상품
  { value: "DELIVERY_BEFORE_COLLECTION", label: "배송 예정" },
  { value: "DELIVERY_START", label: "배송 시작" },
  { value: "DELIVERY_DONE", label: "배송 완료" },
  { value: "DELIVERY_CANCEL", label: "구독결제 취소" },

  { value: "CANCEL_REQUEST", label: "취소 요청" },
  { value: "CANCEL_DONE_SELLER", label: "취소 완료 (판매자 귀책)" },
  { value: "CANCEL_DONE_BUYER", label: "취소 완료 (구매자 귀책)" },
  { value: "RETURN_REQUEST", label: "반품 요청" },
  { value: "RETURN_DONE_SELLER", label: "반품 완료(판매자 귀책)" },
  { value: "RETURN_DONE_BUYER", label: "반품 완료 (구매자 귀책)" },
  { value: "EXCHANGE_REQUEST", label: "교환 요청" },
  { value: "EXCHANGE_DONE_SELLER", label: "교환 완료 (판매자 귀책)" },
  { value: "EXCHANGE_DONE_BUYER", label: "교환 완료 (구매자 귀책)" },

  { value: "FAILED", label: "실패함" }, // 결제 실패
  { value: "FAILED_RESERVED_PAYMENT", label: "예약결제 실패" },
  { value: "CONFIRM", label: "구매 확정" },
];

const ORDER_STATUS_LABEL_MAP: Record<OrderStatus, string> = Object.fromEntries(
  ORDER_STATUS.map(({ value, label }) => [value, label])
) as Record<OrderStatus, string>;

const ORDERS_ORDER_STATUS: SelectOption<OrderStatus>[] = ORDER_STATUS.filter(
  (opt) =>
    ["PAYMENT_DONE", "PRODUCING", "DELIVERY_READY", "FAILED"].includes(
      opt.value
    )
);

const ORDERS_CANCEL_STATUS: SelectOption<OrderStatus>[] = ORDER_STATUS.filter(
  (opt) =>
    ["CANCEL_REQUEST", "CANCEL_DONE_SELLER", "CANCEL_DONE_BUYER"].includes(
      opt.value
    )
);

const ORDERS_DELIVERY_STATUS: SelectOption<OrderStatus>[] = ORDER_STATUS.filter(
  (opt) =>
    ["DELIVERY_BEFORE_COLLECTION", "DELIVERY_START", "DELIVERY_DONE"].includes(
      opt.value
    )
);

const PAYMENT_METHOD_LABEL_MAP: Record<PaymentMethod, string> = {
  NAVER_PAY: "네이버페이",
  KAKAO_PAY: "카카오페이",
  CREDIT_CARD: "신용카드",
};

const CANCELED_ORDER_STATUS_SET = new Set<OrderStatus>([
  "CANCEL_REQUEST",
  "CANCEL_DONE_BUYER",
  "CANCEL_DONE_SELLER",
  "RETURN_REQUEST",
  "RETURN_DONE_SELLER",
  "RETURN_DONE_BUYER",
  "EXCHANGE_REQUEST",
  "EXCHANGE_DONE_SELLER",
  "EXCHANGE_DONE_BUYER",
]);

const CANCEL_REASON = {
  cancelNowOfGeneralOrderByBuyer: "[일반결제] 구매자에 의한 결제 취소",
  cancelNowOfGeneralOrderByBuyerAsDetailReason:
    "주문확인 전, 구매자에 의한 모든 일반상품 즉시 결제취소",

  cancelNowOfSubscribeOrderByBuyer: "[정기결제] 구매자에 의한 결제 취소",
  cancelNowOfSubscribeOrderByBuyerAsDetailReason:
    "주문확인 전, 구매자에 의한 모든 구독상품 즉시 결제취소",

  cancelNowOfGeneralOrderBySeller:
    "[일반결제] 관리자에 의한 결제 취소 (관리자 판매 취소)",

  cancelNowOfSubscribeOrderBySeller:
    "[정기결제] 관리자에 의한 결제 취소 (관리자 판매 취소)",

  // 네이버페이
  unsubscribeNaverpayByAdmin:
    "[정기결제] 관리자에 의한 네이버페이 정기결제 해지 (결제 실패)",
  unsubscribeNaverpayByCustomer:
    "[정기결제] 구매자에 의한 네이버페이 정기결제 해지 (결제 실패)",
};

export {
  INITIAL_SEARCH_REQUEST,
  SALES_SEARCH_CATEGORY,
  ORDER_STATUS,
  ORDER_STATUS_LABEL_MAP,
  SALES_ORDER_TYPE,
  ORDER_TYPE_LABEL_MAP,
  PAYMENT_METHOD_LABEL_MAP,
  CANCELED_ORDER_STATUS_SET,
  ORDERS_ORDER_STATUS,
  PRODUCT_TYPE,
  INITIAL_ORDERS_REQUEST,
  CANCEL_REASON,
  INITIAL_DELIVERY_REQUEST,
  ORDERS_DELIVERY_STATUS,
  INITIAL_CANCEL_REQUEST,
  ORDERS_CANCEL_STATUS,
};
