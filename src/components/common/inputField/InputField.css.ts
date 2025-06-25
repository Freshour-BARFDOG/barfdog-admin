import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const inputContainerStyle = style({});

export const inputBoxStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const inputWrapStyle = style({
  textAlign: "left",
  display: "flex",
});

export const inputBaseStyle = style({
  width: "100%",
  padding: "8px 12px",
  color: themeVars.colors.gray.gray900,
});

export const inputVariants = {
  box: style({
    borderRadius: "8px",
    border: `1px solid ${themeVars.colors.gray.gray200}`,
    backgroundColor: themeVars.colors.gray.gray0,
    selectors: {
      "&.disabled": {
        backgroundColor: themeVars.colors.gray.gray200,
      },
      "&.disabled::placeholder": {
        color: themeVars.colors.gray.gray500,
      },
    },
  }),
  line: style({
    border: "none",
    padding: "12px 4px",
    borderBottom: `1px solid ${themeVars.colors.gray.gray500}`,
  }),
};

export const inputError = {
  box: style({
    border: `1px solid ${themeVars.colors.red.red}`,
  }),
  line: style({
    borderBottom: `1px solid ${themeVars.colors.red.red}`,
  }),
};

export const inputStyle = style({
  width: "100%",
  fontSize: "15px",
  fontWeight: 500,
  letterSpacing: "-0.4px",
  textAlign: "left",
  backgroundColor: "transparent",
  color: themeVars.colors.gray.gray900,
  selectors: {
    "&::placeholder": {
      color: themeVars.colors.gray.gray300,
    },
    '&[type = "button"]': {
      cursor: "pointer",
      color: themeVars.colors.gray.gray300,
    },
  },
});

export const confirmButtonStyle = style({
  padding: "8px 12px !important",
});

export const searchButtonStyle = style({
  width: "24px",
  height: "24px",
  marginRight: "12px",
});

export const rightButtonsStyle = style({
  display: "flex",
  gap: "12px",
});
export const unitStyle = style({
  display: "flex",
  gap: "12px",
});

export const baseButtonStyle = style({
  width: "24px",
  height: "24px",
});

export const inputStateTextStyle = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginTop: "8px",
});
