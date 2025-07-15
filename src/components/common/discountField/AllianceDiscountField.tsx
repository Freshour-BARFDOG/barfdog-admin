"use client";

import React, { useMemo, useCallback } from "react";
import { useController, Control } from "react-hook-form";
import { DISCOUNT_UNIT_TYPE_LIST } from "@/constants/common";
import { DiscountUnitType } from "@/types/common";
import Text from "../text/Text";
import { commonWrapper } from "@/styles/common.css";
import { calculateSalePrice } from "@/utils/discountUtils";
import { DiscountControl } from "../discountControl/DiscountControl";
import Button from "../button/Button";
import * as styles from "./AllianceDiscountField.css";

interface AllianceDiscountFieldProps {
  namePrefix: string;
  control: Control<any>;
  originalPrice: number;
  allianceName: string;
  onRemove: () => void;
}

export default function AllianceDiscountField({
  namePrefix,
  control,
  originalPrice,
  allianceName,
  onRemove,
}: AllianceDiscountFieldProps) {
  const {
    field: { value: degree, onChange: onDegreeChange },
  } = useController({ name: `${namePrefix}.allianceDegree`, control });
  const {
    field: { value: discountType, onChange: onTypeChange },
  } = useController({
    name: `${namePrefix}.allianceDiscountType`,
    control,
  });
  const {
    field: { onChange: onSaleChange },
  } = useController({
    name: `${namePrefix}.allianceSalePrice`,
    control,
  });

  // 계산된 최종가 + 할인액
  const salePrice = useMemo(
    () => calculateSalePrice(originalPrice, degree, discountType),
    [originalPrice, degree, discountType]
  );
  const discountAmount = originalPrice - salePrice;

  const handleDegreeChange = useCallback(
    (newDegree: number) => {
      onDegreeChange(newDegree);
      onSaleChange(salePrice);
    },
    [originalPrice, discountType, onDegreeChange, onSaleChange]
  );

  // 토글 변화 핸들러: 바뀔 때마다 degree 0으로 리셋
  const handleToggle = useCallback(
    (newType: DiscountUnitType) => {
      onTypeChange(newType);
      onDegreeChange(0);
    },
    [onTypeChange, onDegreeChange]
  );

  console.log(allianceName, "all");

  return (
    <div className={styles.allianceDiscountFieldContainer}>
      <div className={commonWrapper({ justify: "between", align: "start" })}>
        <Text type="headline2">{allianceName}</Text>
        <Button size="sm" variant="outline" onClick={onRemove}>
          삭제
        </Button>
      </div>

      <DiscountControl
        value={degree}
        onValueChange={handleDegreeChange}
        options={DISCOUNT_UNIT_TYPE_LIST}
        selected={discountType}
        onToggleChange={handleToggle}
        discountType={discountType}
        originalPrice={originalPrice}
      />

      <Text type="body3">
        최종가:&nbsp;{salePrice.toLocaleString()}원&nbsp; (할인{" "}
        {discountAmount.toLocaleString()}원)
      </Text>
    </div>
  );
}
