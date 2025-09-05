import { ReactNode } from "react";
import {
  buttonStyle,
  containerBaseStyle,
  containerPositionStyle,
  containerStyle,
  primaryCountBox,
} from "./ButtonDocked.css";
import Button from "@/components/common/button/Button";

interface ButtonDockedProps {
  type: "text-button" | "full-button" | "dual-button";
  text?: ReactNode;
  primaryButtonLabel: string | ReactNode;
  secondaryButtonLabel?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  primaryButtonSize?: "sm" | "md" | "lg";
  secondaryButtonType?: "primary" | "assistive";
  primaryButtonVariant?: "solid" | "outline";
  primaryButtonType?: "primary" | "assistive";
  isPrimaryDisabled?: boolean;
  primaryCount?: number;
  position?: "sticky" | "fixed";
  isPadding?: boolean;
  isBorder?: boolean;
}

export default function ButtonDocked({
  type,
  text,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonSize = "md",
  isPrimaryDisabled = false,
  secondaryButtonType = "primary",
  primaryButtonVariant = "solid",
  primaryButtonType = "primary",
  primaryCount,
  position = "fixed",
  isPadding = true,
  isBorder = true,
}: ButtonDockedProps) {
  const primaryButtonStyle =
    type !== "full-button" && buttonStyle[primaryButtonSize];
  const secondaryButtonStyle =
    type === "dual-button" && primaryButtonSize === "lg"
      ? buttonStyle["sm"]
      : buttonStyle[primaryButtonSize];
  const textStyle =
    type === "text-button" && primaryButtonSize === "sm"
      ? buttonStyle["lg"]
      : buttonStyle[primaryButtonSize];

  const positionStyle = containerPositionStyle[position];
  return (
    <div
      className={`${containerStyle[type]} ${containerBaseStyle({
        isBorder,
        isPadding,
      })} ${positionStyle}`}
    >
      {type === "text-button" && <div className={textStyle}>{text}</div>}
      {type === "dual-button" && secondaryButtonLabel && (
        <Button
          onClick={onSecondaryClick}
          type={secondaryButtonType}
          variant="outline"
          className={secondaryButtonStyle}
        >
          {secondaryButtonLabel}
        </Button>
      )}
      <Button
        onClick={onPrimaryClick}
        fullWidth={type === "full-button"}
        type={primaryButtonType}
        variant={primaryButtonVariant}
        disabled={isPrimaryDisabled}
        className={primaryButtonStyle || ""}
      >
        {primaryButtonLabel}
        {primaryCount != null && (
          <span className={primaryCountBox}>{primaryCount}</span>
        )}
      </Button>
    </div>
  );
}
