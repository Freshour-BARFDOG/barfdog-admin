import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { P } from "node_modules/framer-motion/dist/types.d-B_QPEvFK";

// 텍스트 스타일 정의
export const textStyles = {
  display1: style({
    fontWeight: themeVars.typography.display.display1.fontWeight,
    fontSize: themeVars.typography.display.display1.fontSize,
    lineHeight: themeVars.typography.display.display1.lineHeight,
    letterSpacing: themeVars.typography.display.display1.letterSpacing,
  }),
  display2: style({
    fontWeight: themeVars.typography.display.display2.fontWeight,
    fontSize: themeVars.typography.display.display2.fontSize,
    lineHeight: themeVars.typography.display.display2.lineHeight,
    letterSpacing: themeVars.typography.display.display2.letterSpacing,
  }),
  title1: style({
    fontWeight: themeVars.typography.title.title1.fontWeight,
    fontSize: themeVars.typography.title.title1.fontSize,
    lineHeight: themeVars.typography.title.title1.lineHeight,
    letterSpacing: themeVars.typography.title.title1.letterSpacing,
  }),
  title2: style({
    fontWeight: themeVars.typography.title.title2.fontWeight,
    fontSize: themeVars.typography.title.title2.fontSize,
    lineHeight: themeVars.typography.title.title2.lineHeight,
    letterSpacing: themeVars.typography.title.title2.letterSpacing,
  }),
  title3: style({
    fontWeight: themeVars.typography.title.title3.fontWeight,
    fontSize: themeVars.typography.title.title3.fontSize,
    lineHeight: themeVars.typography.title.title3.lineHeight,
    letterSpacing: themeVars.typography.title.title3.letterSpacing,
  }),
  title4: style({
    fontWeight: themeVars.typography.title.title4.fontWeight,
    fontSize: themeVars.typography.title.title4.fontSize,
    lineHeight: themeVars.typography.title.title4.lineHeight,
    letterSpacing: themeVars.typography.title.title4.letterSpacing,
  }),
  headline1: style({
    fontWeight: themeVars.typography.headline.headline1.fontWeight,
    fontSize: themeVars.typography.headline.headline1.fontSize,
    lineHeight: themeVars.typography.headline.headline1.lineHeight,
    letterSpacing: themeVars.typography.headline.headline1.letterSpacing,
  }),
  headline2: style({
    fontWeight: themeVars.typography.headline.headline2.fontWeight,
    fontSize: themeVars.typography.headline.headline2.fontSize,
    lineHeight: themeVars.typography.headline.headline2.lineHeight,
    letterSpacing: themeVars.typography.headline.headline2.letterSpacing,
  }),
  headline3: style({
    fontWeight: themeVars.typography.headline.headline3.fontWeight,
    fontSize: themeVars.typography.headline.headline3.fontSize,
    lineHeight: themeVars.typography.headline.headline3.lineHeight,
    letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
  }),
  headline4: style({
    fontWeight: themeVars.typography.headline.headline4.fontWeight,
    fontSize: themeVars.typography.headline.headline4.fontSize,
    lineHeight: themeVars.typography.headline.headline4.lineHeight,
    letterSpacing: themeVars.typography.headline.headline4.letterSpacing,
  }),
  label1: style({
    fontWeight: themeVars.typography.label.label1.fontWeight,
    fontSize: themeVars.typography.label.label1.fontSize,
    lineHeight: themeVars.typography.label.label1.lineHeight,
    letterSpacing: themeVars.typography.label.label1.letterSpacing,
  }),
  label2: style({
    fontWeight: themeVars.typography.label.label2.fontWeight,
    fontSize: themeVars.typography.label.label2.fontSize,
    lineHeight: themeVars.typography.label.label2.lineHeight,
    letterSpacing: themeVars.typography.label.label2.letterSpacing,
  }),
  label3: style({
    fontWeight: themeVars.typography.label.label3.fontWeight,
    fontSize: themeVars.typography.label.label3.fontSize,
    lineHeight: themeVars.typography.label.label3.lineHeight,
    letterSpacing: themeVars.typography.label.label3.letterSpacing,
  }),
  label4: style({
    fontWeight: themeVars.typography.label.label4.fontWeight,
    fontSize: themeVars.typography.label.label4.fontSize,
    lineHeight: themeVars.typography.label.label4.lineHeight,
    letterSpacing: themeVars.typography.label.label4.letterSpacing,
  }),
  body1: style({
    fontWeight: themeVars.typography.body.body1.fontWeight,
    fontSize: themeVars.typography.body.body1.fontSize,
    lineHeight: themeVars.typography.body.body1.lineHeight,
    letterSpacing: themeVars.typography.body.body1.letterSpacing,
  }),
  body2: style({
    fontWeight: themeVars.typography.body.body2.fontWeight,
    fontSize: themeVars.typography.body.body2.fontSize,
    lineHeight: themeVars.typography.body.body2.lineHeight,
    letterSpacing: themeVars.typography.body.body2.letterSpacing,
  }),
  body3: style({
    fontWeight: themeVars.typography.body.body3.fontWeight,
    fontSize: themeVars.typography.body.body3.fontSize,
    lineHeight: themeVars.typography.body.body3.lineHeight,
    letterSpacing: themeVars.typography.body.body3.letterSpacing,
  }),
  caption: style({
    fontWeight: themeVars.typography.body.caption.fontWeight,
    fontSize: themeVars.typography.body.caption.fontSize,
    lineHeight: themeVars.typography.body.caption.lineHeight,
    letterSpacing: themeVars.typography.body.caption.letterSpacing,
  }),
  caption2: style({
    fontWeight: themeVars.typography.body.caption2.fontWeight,
    fontSize: themeVars.typography.body.caption2.fontSize,
    lineHeight: themeVars.typography.body.caption2.lineHeight,
    letterSpacing: themeVars.typography.body.caption2.letterSpacing,
  }),
};

export const fontColors = {
  white: style({ color: themeVars.colors.gray.gray0 }),
  red: style({ color: themeVars.colors.red.red }),
  pastelRed: style({ color: themeVars.colors.red.pastelRed }),
  gray900: style({ color: themeVars.colors.gray.gray900 }),
  gray800: style({ color: themeVars.colors.gray.gray800 }),
  gray700: style({ color: themeVars.colors.gray.gray700 }),
  gray600: style({ color: themeVars.colors.gray.gray600 }),
  gray500: style({ color: themeVars.colors.gray.gray500 }),
  gray400: style({ color: themeVars.colors.gray.gray400 }),
  gray300: style({ color: themeVars.colors.gray.gray300 }),
  gray200: style({ color: themeVars.colors.gray.gray200 }),
  gray100: style({ color: themeVars.colors.gray.gray100 }),
  gray0: style({ color: themeVars.colors.gray.gray0 }),
  blue500: style({ color: themeVars.colors.blue.blue500 }),
  green500: style({ color: themeVars.colors.green.green500 }),
  yellow500: style({ color: themeVars.colors.yellow.yellow500 }),
  blue400: style({ color: themeVars.colors.blue.blue400 }),
  green400: style({ color: themeVars.colors.green.green400 }),
  yellow400: style({ color: themeVars.colors.yellow.yellow400 }),
  blue600: style({ color: themeVars.colors.blue.blue600 }),
};

const alignStyles = {
  left: style({ textAlign: "left" }),
  center: style({ textAlign: "center" }),
  right: style({ textAlign: "right" }),
};

export const textRecipe = recipe({
  base: {},
  variants: {
    align: alignStyles,
    block: {
      true: {
        display: "block",
      },
    },
    underLine: {
      true: {
        textDecoration: "underline",
      },
    },
    preLine: {
      true: {
        whiteSpace: "pre-line",
      },
    },
    applyLineHeight: {
      false: {
        lineHeight: "normal",
      },
    },
    noShrink: {
      true: {
        flexShrink: 0,
      },
    },
  },
  defaultVariants: {
    align: "left",
  },
});
