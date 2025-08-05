import { ComponentType, FC, SVGProps } from "react";
import { svgIconStyle } from "./SvgIcon.css";
import { COLORS } from "@/constants/style";

export interface IconProps extends SVGProps<SVGSVGElement> {
  src: ComponentType<SVGProps<SVGSVGElement>>;
  size?: number;
  color?: keyof typeof COLORS;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

const SvgIcon: FC<IconProps> = ({
  src: IconComponent,
  size = 24,
  color = "gray900",
  width,
  height,
  className,
  onClick,
  ...rest
}) => {
  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      style={{ color: COLORS[color] }}
      className={`${svgIconStyle} ${className || ""}`}
      onClick={onClick}
      {...rest}
    />
  );
};

export default SvgIcon;
