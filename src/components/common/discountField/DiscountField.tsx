"use client";

import React, { useMemo, useCallback } from "react";
import { useController, Control } from "react-hook-form";
import { DISCOUNT_UNIT_TYPE_LIST } from "@/constants/common";
import { DiscountUnitType } from "@/types/common";
import Text from "../text/Text";
import { commonWrapper } from "@/styles/common.css";
import { calculateSalePrice } from "@/utils/discountUtils";
import { DiscountControl } from "../discountControl/DiscountControl";

interface DiscountFieldProps {
  control: Control<any>;
  originalPrice: number;
}

export function DiscountField({ control, originalPrice }: DiscountFieldProps) {
  const {
    field: { value: degree, onChange: onDegreeChange },
  } = useController({
    name: "discountDegree",
    control,
  });

  const {
    field: { value: discountType, onChange: onTypeChange },
  } = useController({
    name: "discountType",
    control,
  });

  const {
    field: { onChange: onSaleChange },
  } = useController({
    name: "salePrice",
    control,
  });

  // 현재 화면에 보여줄 계산
  const salePrice = useMemo(
    () => calculateSalePrice(originalPrice, degree, discountType),
    [originalPrice, degree, discountType]
  );
  const discountAmount = originalPrice - salePrice;

  // 토글 바뀔 때 degree 리셋 + 즉시 부모에도 알림
  const handleToggle = useCallback(
    (newType: DiscountUnitType) => {
      onTypeChange(newType);
      onDegreeChange(0);
      onSaleChange(calculateSalePrice(originalPrice, 0, newType));
    },
    [originalPrice, onDegreeChange, onSaleChange, onTypeChange]
  );

  // 숫자 입력 바뀔 때 즉시 부모에도 알림
  const handleDegree = useCallback(
    (newDegree: number) => {
      onDegreeChange(newDegree);
      onSaleChange(calculateSalePrice(originalPrice, newDegree, discountType));
    },
    [originalPrice, discountType, onDegreeChange, onSaleChange]
  );

  return (
    <div
      className={commonWrapper({ direction: "col", align: "start", gap: 8 })}
    >
      <DiscountControl
        value={degree}
        onValueChange={handleDegree}
        options={DISCOUNT_UNIT_TYPE_LIST}
        selected={discountType}
        onToggleChange={handleToggle}
        discountType={discountType}
        originalPrice={originalPrice}
      />
      <Text type="body3">
        최종가: {salePrice.toLocaleString()}원 (할인{" "}
        {discountAmount.toLocaleString()}원)
      </Text>
    </div>
  );
}
