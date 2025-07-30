import * as yup from "yup";

/** 단일 자동 쿠폰 항목 스키마 */
export const autoCouponItemSchema = yup.object({
  /** 쿠폰 PK */
  id: yup.number().required(),
  /** 최소 주문 금액(원) – 0 이상 */
  availableMinPrice: yup.number().min(0).required(),
  /** 할인 금액/할인율 – 0 이상 */
  discountDegree: yup.number().min(0).required(),
  name: yup.string().required(),
  discountType: yup.string().required(),
});

/** 자동 쿠폰 폼 전체 스키마 */
export const autoCouponFormSchema = yup.object({
  updateAutoCouponRequestDtoList: yup
    .array(autoCouponItemSchema)
    .min(1)
    .required(),
});

export type AutoCouponItemForm = yup.InferType<typeof autoCouponItemSchema>;

export interface AutoCouponFormValues {
  updateAutoCouponRequestDtoList: AutoCouponItemForm[];
}
