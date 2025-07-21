import { CSSProperties, ReactNode } from "react";
import { textStyles, fontColors, textRecipe } from "./Text.css";

interface TextProps {
  type: keyof typeof textStyles;
  color?: keyof typeof fontColors;
  align?: "left" | "center" | "right";
  children: ReactNode;
  block?: boolean;
  underLine?: boolean;
  className?: string;
  preLine?: boolean;
  applyLineHeight?: boolean;
  style?: CSSProperties;
}

const tagMap = {
  display1: "h1",
  display2: "h2",
  title1: "h3",
  title2: "h3",
  title3: "h3",
  title4: "span",
  headline1: "span",
  headline2: "span",
  headline3: "span",
  headline4: "span",
  label1: "span",
  label2: "span",
  label3: "span",
  label4: "span",
  body1: "span",
  body2: "span",
  body3: "span",
  caption: "span",
  caption2: "span",
} as const;

export default function Text({
  type,
  color = "gray900",
  align = "left",
  children,
  block = false,
  underLine = false,
  className,
  preLine,
  applyLineHeight = true,
  style,
}: TextProps) {
  const textStyle = textStyles[type];
  const colorStyle = fontColors[color];
  const Tag = tagMap[type] || "span";

  // 기존 style과 merge (inline style의 우선순위가 더 높음)
  return (
    <Tag
      className={`${textStyle} ${colorStyle} ${textRecipe({
        align,
        block,
        underLine,
        preLine,
        applyLineHeight,
      })} ${className || ""}`}
      {...(style && { style })}
    >
      {children}
    </Tag>
  );
}
