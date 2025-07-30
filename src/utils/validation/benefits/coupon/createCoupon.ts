import { DISCOUNT_UNIT_TYPE } from "@/constants/common";
import { COUPON_TARGET } from "@/constants/benefits/coupons";
import { CreateCouponType } from "@/types/benefits/coupons";
import * as yup from "yup";

export const createCouponSchema = yup.object().shape({
  name: yup.string().required("쿠폰 이름은 필수입니다."),
  description: yup.string().required("쿠폰 설명은 필수입니다."),
  couponTarget: yup
    .string()
    .oneOf(["ALL", "SUBSCRIBE", "GENERAL"], "유효한 쿠폰 대상이어야 합니다.")
    .required("쿠폰 대상은 필수입니다."),
  code: yup.string()
    .when("couponType", {
      is: "CODE_PUBLISHED",
      then: (schema) => schema.required("코드는 필수입니다."),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  couponType: yup
    .string()
    .oneOf(
      ["CODE_PUBLISHED", "GENERAL_PUBLISHED", "PROMOTION_PUBLISHED"],
      "유효한 쿠폰 타입이어야 합니다."
    )
    .required("쿠폰 타입은 필수입니다."),
  discountDegree: yup
    .number()
    .required()
    .when("discountType", {
      is: "FIXED_RATE",
      then: (schema) => schema.max(100, "할인율은 최대 100까지 가능합니다."),
      otherwise: (schema) => schema,
    }),
  discountType: yup
    .string()
    .oneOf(["FIXED_RATE", "FLAT_RATE"], "유효한 할인 방식이어야 합니다.")
    .required("할인 방식은 필수입니다."),
  availableMaxDiscount: yup
    .number()
    .min(0, "최대 할인 금액은 0 이상이어야 합니다.")
    .required("최대 할인 금액은 필수입니다."),
  availableMinPrice: yup
    .number()
    .min(0, "최소 사용 가능 금액은 0 이상이어야 합니다.")
    .required("최소 사용 금액은 필수입니다."),
  amount: yup
    .number()
    .min(1, "발행 수량은 최소 1 이상이어야 합니다.")
    .required("발행 수량은 필수입니다."),
});

export const defaultCreateCouponValues = {
  name: "",
  description: "",
  couponTarget: "ALL" as keyof typeof COUPON_TARGET,
  code: "",
  couponType: "CODE_PUBLISHED" as CreateCouponType,
  discountDegree: 0,
  discountType: "FIXED_RATE" as keyof typeof DISCOUNT_UNIT_TYPE,
  availableMaxDiscount: 0,
  availableMinPrice: 0,
  amount: 0,
};
