import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const chipsVariants = {
  solid: style({
    position: "relative",
    zIndex: 0,
  }),
  outlined: style({
    border: `1px solid ${themeVars.colors.red.red}`,
    position: "relative",
    zIndex: 0,
  }),
};

export const chipVariantStyles = {
  solid: {
    red: style({
      backgroundColor: themeVars.colors.red.red,
      color: themeVars.colors.gray.gray0,
    }),
    pinkWhite: style({
      backgroundColor: themeVars.colors.red.pinkWhite,
      color: themeVars.colors.red.pastelRed,
    }),
    gray100: style({
      backgroundColor: themeVars.colors.gray.gray100,
      color: themeVars.colors.gray.gray700,
    }),
    gray200: style({
      backgroundColor: themeVars.colors.gray.gray200,
      color: themeVars.colors.gray.gray700,
    }),
    gray600: style({
      backgroundColor: themeVars.colors.gray.gray600,
      color: themeVars.colors.gray.gray0,
    }),
    gray700: style({
      backgroundColor: themeVars.colors.gray.gray700,
      color: themeVars.colors.gray.gray0,
    }),
    gray800: style({
      backgroundColor: themeVars.colors.gray.gray800,
      color: themeVars.colors.gray.gray0,
    }),
    gray900: style({
      backgroundColor: themeVars.colors.gray.gray900,
      color: themeVars.colors.gray.gray0,
    }),
    lightPink: style({
      backgroundColor: themeVars.colors.red.lightPink,
      color: themeVars.colors.red.pastelRed,
    }),
    blue50: style({
      backgroundColor: themeVars.colors.blue.blue50,
      color: themeVars.colors.blue.blue400,
    }),
    blue500: style({
      backgroundColor: themeVars.colors.blue.blue500,
      color: themeVars.colors.gray.gray0,
    }),
    blue600: style({
      backgroundColor: themeVars.colors.blue.blue600,
      color: themeVars.colors.gray.gray0,
    }),
    green500: style({
      backgroundColor: themeVars.colors.green.green500,
      color: themeVars.colors.gray.gray0,
    }),
    green50: style({
      backgroundColor: themeVars.colors.green.green50,
      color: themeVars.colors.green.green600,
    }),
    yellow500: style({
      backgroundColor: themeVars.colors.yellow.yellow500,
      color: themeVars.colors.gray.gray0,
    }),
  },
  outlined: {
    red: style({
      border: `1px solid ${themeVars.colors.red.red}`,
      color: themeVars.colors.red.red,
      backgroundColor: themeVars.colors.gray.gray0,
    }),
    gray800: style({
      border: `1px solid ${themeVars.colors.gray.gray800}`,
      color: themeVars.colors.gray.gray800,
      backgroundColor: themeVars.colors.gray.gray0,
    }),
    gray700: style({
      border: `1px solid ${themeVars.colors.gray.gray700}`,
      color: themeVars.colors.gray.gray700,
      backgroundColor: themeVars.colors.gray.gray0,
    }),
    blue50: style({
      border: `1px solid ${themeVars.colors.blue.blue300}`,
      color: themeVars.colors.blue.blue500,
      backgroundColor: themeVars.colors.blue.blue50,
    }),
  },
};

export const chipsSwitchOff = {
  solid: style({
    backgroundColor: themeVars.colors.gray.gray100,
    color: themeVars.colors.gray.gray700,
    border: "none",
  }),
  outlined: style({
    backgroundColor: themeVars.colors.gray.gray0,
    color: themeVars.colors.gray.gray300,
    border: `1px solid ${themeVars.colors.gray.gray300}`,
  }),
};

export const chipsBorderRadius = {
  sm: style({
    borderRadius: "4px",
  }),
  md: style({
    borderRadius: "8px",
  }),
  lg: style({
    borderRadius: "280px",
  }),
};

export const chipsSize = {
  sm: style({
    display: "inline-flex",
    alignItems: "center",
    letterSpacing: "-0.4px",
    fontSize: "12px",
    fontWeight: 400,
    padding: "2px 8px",
    height: "24px",
    maxWidth: "fit-content",
    whiteSpace: "nowrap",
  }),
  md: style({
    display: "inline-flex",
    alignItems: "center",
    letterSpacing: "-0.4px",
    fontSize: "14px",
    fontWeight: 500,
    padding: "4px 12px",
    height: "32px",
    maxWidth: "fit-content",
    whiteSpace: "nowrap",
  }),
  lg: style({
    display: "inline-flex",
    alignItems: "center",
    letterSpacing: "-0.4px",
    fontSize: "16px",
    fontWeight: 700,
    padding: "4px 12px",
    height: "32px",
    maxWidth: "fit-content",
    whiteSpace: "nowrap",
  }),
};

export const chipsTailStyle = style({
  position: "absolute",
  transform: "translateX(-50%)",
  left: "50%",
  width: "12px",
  height: "12px",
  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
  zIndex: -1,
});

export const chipsTailSize = {
  top: {
    sm: style({ top: "-6px" }),
    md: style({ top: "-8px" }),
    lg: style({ top: "-10px" }),
  },
  bottom: {
    sm: style({ bottom: "-6px" }),
    md: style({ bottom: "-8px" }),
    lg: style({ bottom: "-10px" }),
  },
};

export const chipsTailColor = {
  gray800: style({
    backgroundColor: themeVars.colors.gray.gray800,
  }),
  gray700: style({
    backgroundColor: themeVars.colors.gray.gray700,
  }),
  red: style({
    backgroundColor: themeVars.colors.red.red,
  }),
  blue600: style({
    backgroundColor: themeVars.colors.blue.blue600,
  }),
  green500: style({
    backgroundColor: themeVars.colors.green.green500,
  }),
};

export const chipsTailPosition = {
  top: style({}),
  bottom: style({
    transform: "translateX(-50%) rotate(180deg)",
    top: "unset",
  }),
};

export const chipsTailFixedFont = style({
  fontSize: "12px",
});

export const chipsWidthIcon = style({
  padding: "4px 12px 4px 6px !important",
});
