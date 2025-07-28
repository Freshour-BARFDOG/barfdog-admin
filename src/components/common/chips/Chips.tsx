import React, { ComponentType, ReactNode, SVGProps } from "react";
import {
  chipsVariants,
  chipsSize,
  chipsBorderRadius,
  chipsSwitchOff,
  chipsTailStyle,
  chipsTailPosition,
  chipVariantStyles,
  chipsTailColor,
  chipsTailSize,
  chipsTailFixedFont, chipsWidthIcon,
} from "./Chips.css";
import { CHIPS_COLORS } from "@/constants/style";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface ChipsProps {
  variant: keyof typeof chipsVariants;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  borderRadius?: keyof typeof chipsBorderRadius;
  switchOff?: boolean;
  className?: string;
  color?: keyof typeof CHIPS_COLORS;
  tailVisible?: boolean;
  tailPosition?: 'top' | 'bottom';
  style?: React.CSSProperties;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export default function Chips({
  variant,
  children,
  size = "sm",
  borderRadius = 'sm',
  switchOff = false,
  color = "gray700",
  tailVisible = false,
  tailPosition = 'top',
  style,
  className,
  icon,
}: ChipsProps) {
  // color가 chipVariantStyles[variant]에 존재하는지 타입 안전하게 확인
  const variantStyles = chipVariantStyles[variant as 'solid' | 'outlined'];
  const colorStyle = (color && variantStyles && Object.prototype.hasOwnProperty.call(variantStyles, color))
    ? variantStyles[color as keyof typeof variantStyles]
    : "";

  return (
    <span
      className={`
      ${chipsVariants[variant]}
      ${chipsBorderRadius[borderRadius]} 
      ${chipsSize[size]}
      ${switchOff && chipsSwitchOff[variant] || ''}
      ${colorStyle}
      ${className || ''}
      ${tailVisible ? chipsTailFixedFont : ''}
      ${icon ? chipsWidthIcon : ''}
    `}
    style={style}
    >
      {tailVisible &&
        <span
          className={`
            ${chipsTailStyle}
            ${chipsTailPosition[tailPosition]}
            ${(chipsTailColor as Record<string, string>)[color] || ''}
            ${chipsTailSize[tailPosition][size]}
          `}
        />
      }
      {icon && <SvgIcon src={icon} color='white' />}
      {children}
    </span>
  );
}
