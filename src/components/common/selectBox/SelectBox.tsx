import * as styles from "./SelectBox.css";
import Arrow from "/public/images/icons/chevron-left-blue.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { SelectOption } from "@/types/common";

export type SelectBoxProps<T extends string | number> = {
  options: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  fullWidth?: boolean;
};

export default function SelectBox<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  disabled = false,
  required = false,
  name,
  id,
  className = "",
  fullWidth = false,
}: SelectBoxProps<T>) {
  return (
    <div className={styles.selectBox({ fullWidth })}>
      <select
        name={name}
        id={id}
        value={value ?? ""}
        className={`${styles.select({ fullWidth })} ${className}`}
        onChange={(e) => {
          const selectedValue = options.find(
            (opt) => String(opt.value) === e.target.value
          )?.value;
          if (selectedValue !== undefined) {
            onChange?.(selectedValue);
          }
        }}
        disabled={disabled}
        required={required}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map(({ label, value }) => (
          <option key={String(value)} value={String(value)}>
            {label}
          </option>
        ))}
      </select>
      <SvgIcon src={Arrow} size={18} className={styles.selectArrowIcon} />
    </div>
  );
}
