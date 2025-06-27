import { SelectOption } from "@/types/common";
import { OrderSearchCategory, OrderStatus, OrderType } from "@/types/orders";
import { format } from "date-fns";

const INITIAL_ORDERS_REQUEST = {
  from: "2001-01-01",
  to: format(new Date(), "yyyy-MM-dd"),
  merchantUid: null, // 주문번호
  memberName: null, // 구매자 이름
  memberEmail: null, // 구매자 이메일(로그인 아이디)
  recipientName: null, // 수령자 이름
  dogName: null, // 반려견 이름
  statusList: null,
  orderType: "ALL" as OrderType,
};

const ORDER_SEARCH_CATEGORY: {
  label: string;
  value: OrderSearchCategory;
}[] = [
  { label: "구매자 이름", value: "memberName" },
  { label: "구매자 ID", value: "memberEmail" },
  { label: "반려견 이름", value: "dogName" },
  { label: "주문번호", value: "merchantUid" },
  { label: "수령자 이름", value: "recipientName" },
];

const ORDER_SEARCH_STATUS: SelectOption<OrderStatus>[] = [
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
  ORDER_SEARCH_STATUS.map(({ value, label }) => [value, label])
) as Record<OrderStatus, string>;

export {
  INITIAL_ORDERS_REQUEST,
  ORDER_SEARCH_CATEGORY,
  ORDER_SEARCH_STATUS,
  ORDER_STATUS_LABEL_MAP,
};
