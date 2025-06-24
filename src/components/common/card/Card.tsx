import { ReactNode } from "react";
import { commonWrapper } from "@/styles/common.css";

interface CardProps {
  direction?: "row" | "col";
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end" | "between";
  width?: "full" | "auto";
  height?: "full" | "auto";
  shadow: "light" | "normal" | "strong" | "none";
  padding?: "none" | 12 | 16 | 20 | 32 | "20/16";
  textAlign?: "none" | "left" | "center";
  children: ReactNode;
  className?: string;
  backgroundColor?: "none" | "gray0" | "gray50" | "gray100" | "transparent";
  borderRadius?: "none" | 8 | 12 | 16;
  gap?: "none" | 4 | 8 | 12 | 16 | 20 | 32 | 40;
}

const Card = ({
  direction = "col",
  justify,
  align,
  width,
  height,
  textAlign,
  shadow = "light",
  padding,
  children,
  backgroundColor = "gray0",
  borderRadius = 8,
  gap,
  className,
}: CardProps) => {
  return (
    <div
      className={`
        ${commonWrapper({
          direction,
          justify,
          align,
          gap,
          padding,
          textAlign,
          shadow,
          backgroundColors: backgroundColor,
          width,
          height,
          borderRadius,
        })}
				${className || ""}
			`}
    >
      {children}
    </div>
  );
};

export default Card;
