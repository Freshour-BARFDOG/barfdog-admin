import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const containerBaseStyle = recipe({
  base: {
    position: "sticky",
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    alignItems: "center",
    background: themeVars.colors.gray.gray0,
    margin: "0 auto",
    bottom: 0,
    zIndex: 100,
  },
  variants: {
    isPadding: {
      true: {
        padding: "20px",
      },
      false: {},
    },
    isBorder: {
      true: {
        borderTop: `1px solid ${themeVars.colors.gray.gray200}`,
      },
      false: {},
    },
  },
  defaultVariants: {
    isBorder: true,
    isPadding: true,
  },
});

export const containerPositionStyle = {
  sticky: style({
    position: "sticky",
  }),
  fixed: style({
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
  }),
};

export const containerStyle = {
  "full-button": style({
    justifyContent: "center",
  }),
  "dual-button": style({
    justifyContent: "space-between",
    gap: "8px",
  }),
  "text-button": style({
    justifyContent: "space-between",
    gap: "16px",
  }),
};

export const buttonStyle = {
  sm: style({
    width: "25% !important",
  }),
  md: style({
    width: "calc(100% / 2) !important",
  }),
  lg: style({
    width: "75% !important",
  }),
};

export const primaryCountBox = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: themeVars.colors.gray.gray0,
  color: themeVars.colors.red.red,
  fontSize: themeVars.typography.body.caption.fontSize,
  fontWeight: themeVars.typography.body.caption.fontWeight,
  lineHeight: "normal",
  marginLeft: "6px",
});
