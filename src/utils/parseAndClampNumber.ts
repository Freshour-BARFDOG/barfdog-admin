export type NumberFieldMode = "normal" | "discount";

export interface ParseAndClampNumberProps {
  /** `<input>` 등에서 들어오는 원시 문자열 ("1,000", "50", "abc" 등) */
  rawInput: string;
  /** 숫자 처리 모드 ("normal" | "discount") */
  mode: NumberFieldMode;
  /** 할인 타입 ("FIXED_RATE" | "FLAT_RATE") */
  discountType?: "FIXED_RATE" | "FLAT_RATE";
  /** 원가 (FLAT_RATE 모드에서 상한으로 사용, 없으면 상한 무제한) */
  originalPrice?: number;
}

/**
 * 문자열(rawInput)을 숫자로 파싱한 뒤, mode와 discountType에 따라 강제(clamp)합니다.
 */
export function parseAndClampNumber({
  rawInput,
  mode,
  discountType = "FLAT_RATE",
  originalPrice,
}: ParseAndClampNumberProps): number {
  // 1) 쉼표 제거 + 숫자 파싱
  const cleaned = rawInput.replace(/,/g, "");
  const parsed = Number(cleaned);
  const value = isNaN(parsed) ? 0 : parsed;

  // 2) discount 모드가 아니라면 그대로 반환
  if (mode !== "discount") {
    return value;
  }

  // 3) FIXED_RATE → 0~100, FLAT_RATE → 0~originalPrice (originalPrice 없으면 상한 없음)
  if (discountType === "FIXED_RATE") {
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
  } else {
    // FLAT_RATE 모드에서는 0 이상, originalPrice 이하로 클램프
    if (value < 0) return 0;
    if (originalPrice !== undefined && value > originalPrice) {
      return originalPrice;
    }
    return value;
  }
}
