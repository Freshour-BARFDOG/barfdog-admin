import { DiscountUnitType } from "@/types/common";

export function calculateSalePrice(
  originalPrice: number,
  discountDegree: number,
  discountType: DiscountUnitType
): number {
  if (discountType === "FIXED_RATE") {
    return Math.floor((originalPrice * (100 - discountDegree)) / 100);
  } else {
    return Math.max(originalPrice - discountDegree, 0);
  }
}
