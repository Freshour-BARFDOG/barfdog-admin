import * as styles from "./LabeledCheckBox.css";
import SvgIcon from "../svgIcon/SvgIcon";
import CheckedCircle from "/public/images/icons/checked_selection.svg";
import UnCheckedCircle from "/public/images/icons/unchecked_radio.svg";
import CheckedSquare from "/public/images/icons/checked_square.svg";
import UnCheckedSquare from "/public/images/icons/unchecked_square.svg";
import Text from "@/components/common/text/Text";

export interface LabeledCheckboxProps<T = string> {
  label?: string;
  iconSize?: number;
  value: T;
  isChecked: boolean;
  iconType?: "circle" | "square";
  onToggle: (value: T) => void;
  className?: string;
  iconClick?: boolean;
}

export default function LabeledCheckbox<T = string>({
  label,
  iconSize = 24,
  value,
  isChecked,
  iconType = "square",
  onToggle,
  className,
  iconClick = false,
}: LabeledCheckboxProps<T>) {
  const iconMapping = {
    circle: {
      true: CheckedCircle,
      false: UnCheckedCircle,
    },
    square: {
      true: CheckedSquare,
      false: UnCheckedSquare,
    },
  };
  const icon = iconMapping[iconType][isChecked ? "true" : "false"];
  return (
    <div
      className={`${styles.labelCheckedBoxContainer} ${className || ''}`}
      onClick={() => !iconClick ? onToggle(value) : undefined}
    >
      <SvgIcon src={icon} size={iconSize} onClick={() => iconClick ? onToggle(value) : undefined} />
      {label &&
        <Text type='body3'>{label}</Text>
      }
    </div>
  );
}
