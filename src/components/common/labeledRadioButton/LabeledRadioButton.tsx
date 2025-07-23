import CheckedRadio from "/public/images/icons/checked_radio.svg";
import UnCheckedRadio from "/public/images/icons/unchecked_radio.svg";
import CheckedSelection from "/public/images/icons/checked_selection.svg";
import * as styles from "./LabeledRadioButton.css";
import SvgIcon from "../svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";

export interface LabeledRadioButtonProps<
  T extends string | number | boolean = string
> {
  label?: string;
  iconSize?: number;
  optionType?: "radio" | "selection";
  value: T;
  isChecked: boolean;
  onToggle: (value: T) => void;
  className?: string;
}

export default function LabeledRadioButton<
  T extends string | number | boolean = string
>({
  label,
  iconSize = 24,
  optionType = "radio",
  value,
  isChecked,
  onToggle,
  className,
}: LabeledRadioButtonProps<T>) {
  const icon = !isChecked
    ? UnCheckedRadio
    : optionType === "radio"
    ? CheckedRadio
    : CheckedSelection;
  return (
    <div
      className={`${styles.labeledRadioButtonContainer} ${className || ""}`}
      onClick={() => onToggle(value)}
    >
      <SvgIcon src={icon} size={iconSize} />
      {label && <Text type="body3">{label}</Text>}
    </div>
  );
}
