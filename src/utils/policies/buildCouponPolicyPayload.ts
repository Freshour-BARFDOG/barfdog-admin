import { UpdateAutoCouponRequest } from "@/types/policies";
import { AutoCouponFormValues } from "../validation/policies/coupon";

export function buildCouponPolicyPayload(
  values: AutoCouponFormValues
): UpdateAutoCouponRequest {
  return {
    updateAutoCouponRequestDtoList: values.updateAutoCouponRequestDtoList.map(
      ({ id, availableMinPrice, discountDegree }) => ({
        id,
        availableMinPrice,
        discountDegree,
      })
    ),
  };
}
