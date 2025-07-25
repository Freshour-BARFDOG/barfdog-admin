import { SUBSCRIBE_STATUS } from "@/constants/subscribe";
import { Page } from "./common";

interface SubscribeHistoryDto {
  subscribeId: number;
  email: string;
  memberName: string;
  dogName: string;
  createdDate: string; // ISO 8601 문자열
  modifiedDate: string; // ISO 8601 문자열
  subscribeCount: number;
  subscribePlan: "TOPPING" | "HALF" | string;
  recipeName: string;
  oneMealGramsPerRecipe: string;
  nextPaymentPrice: number;
  nextPaymentDate: string; // ISO 8601 문자열
  subscribeStatus: SubscribeStatus;
  cancelDate: string | null;
  cancelDoneDate: string | null;
  cancelReason: string | null;
  countSkipOneTime: number;
  countSkipOneWeek: number;
  memberCouponName: string | null;
  discountCoupon: number;
  overDiscount: number;
  discountGrade: number;
  nextOrderMerchantUid: string;
  historyCategory: "SUBSCRIBE" | string;
  deleted: boolean;
}

type SubscribeHistoryList = SubscribeHistoryDto[];

interface SubscribeHistoryListResponse {
  history: SubscribeHistoryList;
  page: Page;
}

interface SubscribeHistoryRequest {
  memberName: string | null;
  dogName: string | null;
  email: string | null;
  id: string | null;
}

interface SubscribeHistoryParams {
  /** body 에는 검색 필터값 전부 */
  body: SubscribeHistoryRequest;
  /** 0부터 시작하는 페이지 번호 (기본값 0) */
  page?: number;
  /** 페이지당 사이즈 (기본값 50) */
  size?: number;
}

interface SubscribeDto {
  id: number;
  subscribeStatus: keyof typeof SUBSCRIBE_STATUS;
  dogId: number;
  dogName: string;
  cancelReason: string | null;
  subscribeCount: number;
  plan: Plan;
  oneMealGramsPerRecipe: string;
  oneDayRecommendKcal: number;
  nextPaymentDate: string;
  countSkipOneTime: number;
  countSkipOneWeek: number;
  nextPaymentPrice: number;
  discountCoupon: number;
  discountGrade: number;
  overDiscount: number;
  nextDeliveryDate: string;
  usingMemberCouponId: number | null;
  couponName: string | null;
}

interface SubscribeRecipeDto {
  recipeId: number;
  recipeName: string;
}

interface MemberCouponDto {
  // 추후에 추가
  id?: number;
}

interface RecipeDto {
  id: number;
  name: string;
  description: string;
  pricePerGram: number;
  gramPerKcal: number;
  inStock: boolean;
  imgUrl: string;
}

interface SubscribeDetailResponse {
  subscribeDto: SubscribeDto;
  subscribeRecipeDtoList: SubscribeRecipeDto[];
  memberCouponDtoList: MemberCouponDto[];
  recipeDtoList: RecipeDto[];
}

type SubscribeStatus = keyof typeof SUBSCRIBE_STATUS;

type Plan = "FULL" | "HALF" | "TOPPING";

interface UpdatePlanAndRecipeRequest {
  plan: Plan;
  recipeIds: number[];
  nextPaymentPrice: number;
}

export type {
  SubscribeHistoryDto,
  SubscribeHistoryList,
  SubscribeHistoryListResponse,
  SubscribeHistoryRequest,
  SubscribeHistoryParams,
  SubscribeStatus,
  SubscribeDetailResponse,
  Plan,
  UpdatePlanAndRecipeRequest,
};
