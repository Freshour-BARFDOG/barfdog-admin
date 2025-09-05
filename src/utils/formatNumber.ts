import { ChangeEvent } from "react";
import { parseAndClampNumber } from "./parseAndClampNumber";

export const formatNumberWithComma = (value: number | string): string =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const unformatCommaNumber = (value: string): number =>
  Number(value.replace(/,/g, ""));

// 숫자 입력 핸들러
export const handleChangeNumberType = (
  e: ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: number) => void }
) => {
  const raw = parseAndClampNumber({ rawInput: e.target.value });
  field.onChange(raw);
};
