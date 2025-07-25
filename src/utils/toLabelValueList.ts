import { SelectOption } from "@/types/common";

export function toLabelValueList<T extends Record<string, string>>(
  obj: T
): SelectOption<string>[] {
  return Object.entries(obj).map(([key, val]) => ({
    label: val,
    value: key,
  }));
}
