"use client";

import React, { ChangeEvent, useCallback } from "react";
import InputField from "@/components/common/inputField/InputField";
import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { formatNumberWithComma } from "@/utils/formatNumber";
import { parseAndClampNumber } from "@/utils/parseAndClampNumber";
import * as styles from "./DiscountControl.css";
import { DiscountUnitType, SelectOption } from "@/types/common";

interface DiscountControlProps {
  /** 입력된 숫자 값 */
  value: number;
  /** 숫자 변경 콜백 */
  onValueChange: (next: number) => void;
  /** 토글용 옵션 리스트 */
  options: SelectOption<DiscountUnitType>[];
  /** 선택된 토글 값 */
  selected: DiscountUnitType;
  /** 토글 변경 콜백 */
  onToggleChange: (next: DiscountUnitType) => void;
  /** discountType 에 해당하는 DiscountUnitType */
  discountType: DiscountUnitType;
  originalPrice?: number;
}

export default function DiscountControl<T extends string>({
  value,
  onValueChange,
  options,
  selected,
  onToggleChange,
  discountType,
  originalPrice,
}: DiscountControlProps) {
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = parseAndClampNumber({
        rawInput: e.target.value,
        mode: "discount",
        discountType,
        originalPrice,
      });
      onValueChange(next);
    },
    [discountType, onValueChange]
  );

  return (
    <div className={commonWrapper({ gap: 8, justify: "start" })}>
      <div className={styles.inputWrapper}>
        <InputField
          value={formatNumberWithComma(value)}
          onChange={handleInput}
        />
      </div>
      <div className={styles.switchWrapper}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={styles.switchButton({ active: opt.value === selected })}
            onClick={() => {
              onToggleChange(opt.value);
              onValueChange(0);
            }}
          >
            <Text
              type="label4"
              color={opt.value === selected ? "gray0" : "gray900"}
            >
              {opt.label}
            </Text>
          </button>
        ))}
      </div>
    </div>
  );
}
