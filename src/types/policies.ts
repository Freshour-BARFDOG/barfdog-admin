import { DiscountUnitType } from "./common";

type OrderDeadline = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

/** 활동량 보정 계수 */
interface ActivityConstant {
  activityVeryLittle: number;
  activityLittle: number;
  activityNormal: number;
  activityMuch: number;
  activityVeryMuch: number;
}

/** 간식량 보정 계수 */
interface SnackConstant {
  snackLittle: number;
  snackNormal: number;
  snackMuch: number;
}

/** 배송비 정책 */
interface DeliveryConstant {
  /** 기본 배송비 (원) */
  price: number;
  /** 무료 배송 조건 금액 (원) */
  freeCondition: number;
}

/** 표준 가중치 계수 */
interface StandardVar {
  youngDog: number;
  oldDog: number;
  neutralizationFalse: number;
  neutralizationTrue: number;
  needDiet: number;
  obesity: number;
  pregnant: number;
  lactating: number;
}

/** 정책 설정 값 조회 API 응답 */
interface PolicySettingsResponse {
  createdDate: string;
  modifiedDate: string;
  id: number;
  activityConstant: ActivityConstant;
  snackConstant: SnackConstant;
  deliveryConstant: DeliveryConstant;
  orderDeadline: OrderDeadline;
  standardVar: StandardVar;
}

interface AutoCouponDto {
  id: number;
  name: string;
  discountType: DiscountUnitType;
  /** 할인 금액(FLAT_RATE) 또는 할인율(FIXED_RATE) */
  discountDegree: number;
  /** 최소 주문 금액(원) — 0이면 조건 없음 */
  availableMinPrice: number;
  createdDate: string; // ISO‑8601
  modifiedDate: string; // ISO‑8601
}

/** 쿠폰 목록 조회 API 응답 */
type AutoCouponResponse = AutoCouponDto[];

interface UpdateAutoCouponDto {
  availableMinPrice: number;
  discountDegree: number;
  id: number;
}

interface UpdateAutoCouponRequest {
  updateAutoCouponRequestDtoList: UpdateAutoCouponDto[];
}

interface UpdateAlgorithmSettingRequest {
  activityVeryLittle: number;
  activityLittle: number;
  activityNormal: number;
  activityMuch: number;
  activityVeryMuch: number;
  snackLittle: number;
  snackNormal: number;
  snackMuch: number;
  youngDog: number;
  oldDog: number;
  neutralizationFalse: number;
  neutralizationTrue: number;
  needDiet: number;
  obesity: number;
  pregnant: number;
  lactating: number;
}

interface UpdateDiscountPolicy {
  full: number;
  half: number;
  topping: number;
}

interface PlanDiscountResponse {
  createdDate: string;
  modifiedDate: string;
  full: number;
  half: number;
  topping: number;
  toppingFull: number;
  toppingHalf: number;
}

export type {
  ActivityConstant,
  SnackConstant,
  DeliveryConstant,
  StandardVar,
  OrderDeadline,
  PolicySettingsResponse,
  AutoCouponResponse,
  AutoCouponDto,
  UpdateAutoCouponRequest,
  UpdateAutoCouponDto,
  UpdateAlgorithmSettingRequest,
  UpdateDiscountPolicy,
  PlanDiscountResponse,
};
