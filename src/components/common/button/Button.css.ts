import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const baseStyle = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const textStyle = style({
  fontFamily: "var(--font-pretendard)",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "normal",
  whiteSpace: "nowrap",
});

export const boxShadowStyle = style({
  boxShadow: themeVars.shadow.light,
});

// 버튼 크기
export const buttonSizes = {
  sm: style({
    padding: "6px 16px",
    height: "36px",
    borderRadius: "8px",
    fontWeight: themeVars.typography.headline.headline4.fontWeight,
    fontSize: themeVars.typography.headline.headline4.fontSize,
    lineHeight: themeVars.typography.headline.headline4.lineHeight,
    letterSpacing: themeVars.typography.headline.headline4.letterSpacing,
  }),
  md: style({
    padding: "10px 24px",
    height: "44px",
    borderRadius: "8px",
    fontWeight: themeVars.typography.headline.headline3.fontWeight,
    fontSize: themeVars.typography.headline.headline3.fontSize,
    lineHeight: themeVars.typography.headline.headline3.lineHeight,
    letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
  }),
  lg: style({
    padding: "12px 28px",
    height: "48px",
    borderRadius: "8px",
    fontWeight: themeVars.typography.headline.headline3.fontWeight,
    fontSize: themeVars.typography.headline.headline3.fontSize,
    lineHeight: themeVars.typography.headline.headline3.lineHeight,
    letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
  }),
  inputButton: style({
    padding: "6px 16px",
    height: "36px",
    minWidth: "84px",
    borderRadius: "8px",
    fontWeight: themeVars.typography.headline.headline4.fontWeight,
    fontSize: themeVars.typography.headline.headline4.fontSize,
    lineHeight: themeVars.typography.headline.headline4.lineHeight,
    letterSpacing: themeVars.typography.headline.headline4.letterSpacing,
  }),
};

export const iconContainer = style({
  display: "inline-flex",
  alignItems: "center",
  columnGap: "6px",
});

// 버튼 상태
export const buttonVariants = {
  solid: {
    primary: style({
      backgroundColor: themeVars.colors.red.red,
      color: themeVars.colors.gray.gray0,
      border: "none",
      cursor: "pointer",
    }),
  },
  outline: {
    primary: style({
      backgroundColor: themeVars.colors.gray.gray0,
      border: `1px solid ${themeVars.colors.red.red}`,
      color: themeVars.colors.red.red,
      cursor: "pointer",
    }),
    secondary: style({
      backgroundColor: themeVars.colors.gray.gray0,
      border: `1px solid ${themeVars.colors.gray.gray300}`,
      color: themeVars.colors.red.red,
      cursor: "pointer",
    }),
    assistive: style({
      backgroundColor: themeVars.colors.gray.gray0,
      border: `1px solid ${themeVars.colors.gray.gray300}`,
      color: themeVars.colors.gray.gray900,
      cursor: "pointer",
    }),
  },
  text: {
    primary: style({
      backgroundColor: "transparent",
      color: themeVars.colors.red.red,
      cursor: "pointer",
      border: "none",
    }),
    assistive: style({
      backgroundColor: "transparent",
      color: themeVars.colors.gray.gray500,
      cursor: "pointer",
      border: "none",
    }),
  },
};

// 비활성화 상태
export const disabledVariants = {
  solid: {
    primary: style({
      backgroundColor: themeVars.colors.gray.gray300,
      color: themeVars.colors.gray.gray0,
      cursor: "not-allowed",
    }),
  },
  outline: {
    primary: style({
      borderColor: themeVars.colors.gray.gray300,
      color: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
    secondary: style({
      borderColor: themeVars.colors.gray.gray300,
      color: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
    assistive: style({
      borderColor: themeVars.colors.gray.gray300,
      color: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
  },
  text: {
    primary: style({
      borderColor: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
    assistive: style({
      borderColor: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
  },
};
