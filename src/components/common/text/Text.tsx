import { CSSProperties, ReactNode } from "react";
import {
  textStyles,
  fontColors,
  alignStyles,
  blockStyles,
  underline, preLineStyles,
} from "./Text.css";

interface DefaultTextProps {
  type: keyof typeof textStyles;
  color?: keyof typeof fontColors;
  align?: "left" | "center" | "right";
  children: ReactNode;
  block?: boolean;
  underLine?: boolean;
  className?: string;
  style?: CSSProperties;
  preLine?: boolean;
  applyLineHeight?: boolean;
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
  style,
  preLine,
  applyLineHeight = true,
}: DefaultTextProps) {
  const textStyle = textStyles[type];
  const colorStyle = fontColors[color];
  const alignStyle = alignStyles[align];
  const underlineStyle = underLine ? underline : "";
  const Tag = tagMap[type] || "span";
  const blockStyle = block ? blockStyles.true : "";
  const preLineStyle = preLine ? preLineStyles.true : "";

  const overrideLineHeight = applyLineHeight === false ? { lineHeight: "normal" } : {};

  // 기존 style과 merge (inline style의 우선순위가 더 높음)
  const finalStyle = { ...style, ...overrideLineHeight };
  return (
    <Tag
      className={`${textStyle} ${colorStyle} ${alignStyle} ${underlineStyle} ${blockStyle} ${preLineStyle} ${
        className || ""
      }`}
      style={finalStyle}
    >
      {children}
    </Tag>
  );
}
