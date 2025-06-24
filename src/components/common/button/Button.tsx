import { ComponentType, CSSProperties, MouseEvent, ReactNode, SVGProps } from "react";
import {
  buttonSizes,
  buttonVariants,
  disabledVariants,
  iconContainer,
  baseStyle,
  textStyle, boxShadowStyle,
} from "./Button.css";
import SvgIcon from "../svgIcon/SvgIcon";
import { COLORS } from "@/constants/style";

interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  type?: "primary" | "secondary" | "assistive";
  size?: "sm" | "md" | "lg" | "inputButton";
  disabled?: boolean;
  iconSrc?: ComponentType<SVGProps<SVGSVGElement>>;
  iconPosition?: "left" | "right";
  iconColor?: keyof typeof COLORS;
  onClick?: (() => void) | ((e: MouseEvent<HTMLButtonElement>) => void);
  children: ReactNode;
  fullWidth?: boolean;
  buttonColor?: keyof typeof COLORS;
  textColor?: keyof typeof COLORS;
  borderColor?: keyof typeof COLORS;
  buttonType?: "submit" | "button" | "reset";
  style?: CSSProperties;
  className?: string;
  showBoxShadow?: boolean;
}

export default function Button({
  variant = "solid",
  type = "primary",
  size = "md",
  disabled = false,
  iconSrc,
  iconPosition = "left",
  iconColor = 'gray900',
  onClick,
  children,
  fullWidth = false,
  buttonColor,
  textColor,
  borderColor,
  buttonType = "button",
  style,
  className,
  showBoxShadow = false,
}: ButtonProps) {
  // type as keyof typeof buttonVariants[typeof variant] => type 이 buttonVariants[variant] 객체의 키임을 명시
  const variantStyle =
    buttonVariants[variant][
      type as keyof (typeof buttonVariants)[typeof variant]
    ];
  const sizeStyle = variant !== "text" ? buttonSizes[size] : "";
  const disabledStyle = disabled
    ? disabledVariants[variant][
        type as keyof (typeof disabledVariants)[typeof variant]
      ]
    : "";

  const shadowStyle = showBoxShadow ? boxShadowStyle : "";

  const isIconLeft = iconPosition === "left";

  const iconSize = size === "sm" ? 20 : 24;

  // buttonColor와 textColor가 있을 경우 오버라이드 스타일 적용
  const overrideStyles: React.CSSProperties = {
    ...(buttonColor && {
      backgroundColor: COLORS[buttonColor],
    }),
    ...(textColor && {
      color: COLORS[textColor],
      ...(variant === "outline" && borderColor && {
        border: `1px solid ${COLORS[borderColor]}`,
      }),
    }),
  };

  const computedStyle: React.CSSProperties = {
    ...(fullWidth ? { width: "100%" } : {}),
    ...style,
    ...overrideStyles,
  };

  return (
    <button
      type={buttonType}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${disabledStyle} ${shadowStyle} ${
        className || ""
      }`}
      onClick={onClick}
      style={computedStyle}
      disabled={disabled}
    >
      {iconSrc ? (
        <div className={iconContainer}>
          {isIconLeft && iconSrc && <SvgIcon src={iconSrc} size={iconSize} color={iconColor || 'gray900'} />}
          <span className={textStyle}>{children}</span>
          {!isIconLeft && iconSrc && <SvgIcon src={iconSrc} size={iconSize} color={iconColor || 'gray900'} />}
        </div>
      ) : (
        <span
          className={textStyle}
          style={textColor ? { color: COLORS[textColor] } : undefined}
        >
          {children}
        </span>
      )}
    </button>
  );
}
