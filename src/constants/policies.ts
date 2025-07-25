import { SelectOption } from "@/types/common";
import { OrderDeadline } from "@/types/policies";

const ORDER_DEADLINES = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const;

const GRADE_COUPON_NAMES = [
  "등급쿠폰1000원",
  "등급쿠폰2000원",
  "등급쿠폰2500원",
  "등급쿠폰3000원",
  "등급쿠폰4000원",
  "등급쿠폰5000원",
];
const EVENT_COUPON_NAMES = [
  "정기구독할인쿠폰",
  "반려견생일쿠폰",
  "견주생일쿠폰",
];

const ACTIVITY_FIELDS = [
  { key: "activityVeryMuch", label: "매우 많음" },
  { key: "activityNormal", label: "보통" },
  { key: "activityMuch", label: "많음" },
  { key: "activityLittle", label: "적음" },
  { key: "activityVeryLittle", label: "매우 적음" },
] as const;

const SNACK_FIELDS = [
  { key: "snackMuch", label: "많음" },
  { key: "snackNormal", label: "보통" },
  { key: "snackLittle", label: "적음" },
] as const;

const STANDARD_FIELDS = [
  { key: "youngDog", label: "자견" },
  { key: "oldDog", label: "노령견" },
  { key: "neutralizationFalse", label: "중성화 X" },
  { key: "neutralizationTrue", label: "중성화 O" },
  { key: "needDiet", label: "다이어트 필요" },
  { key: "obesity", label: "비만" },
  { key: "pregnant", label: "임신" },
  { key: "lactating", label: "수유 중" },
] as const;

const PLAN_DISCOUNT_FIELDS = [
  { key: "full", label: "풀 플랜" },
  { key: "half", label: "하프 플랜" },
  { key: "topping", label: "토핑 플랜" },
] as const;
const DELIVERY_FEE_FIELDS = [
  { key: "price", label: "기본 배송비" },
  { key: "freeCondition", label: "무료 배송 조건" },
] as const;

const ORDER_DEADLINE_OPTIONS: SelectOption<OrderDeadline>[] = [
  { value: "mon", label: "월" },
  { value: "tue", label: "화" },
  { value: "wed", label: "수" },
  { value: "thu", label: "목" },
  { value: "fri", label: "금" },
  { value: "sat", label: "토" },
  { value: "sun", label: "일" },
];

export {
  ORDER_DEADLINES,
  GRADE_COUPON_NAMES,
  EVENT_COUPON_NAMES,
  STANDARD_FIELDS,
  ACTIVITY_FIELDS,
  SNACK_FIELDS,
  PLAN_DISCOUNT_FIELDS,
  DELIVERY_FEE_FIELDS,
  ORDER_DEADLINE_OPTIONS,
};
