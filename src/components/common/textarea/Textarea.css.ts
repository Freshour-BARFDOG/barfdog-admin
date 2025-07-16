import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const textareaBaseStyle = style({
  width: "100%",
});

export const textareaBoxStyle = style({
  minHeight: "142px",
  position: "relative",
});

export const textareaStyle = recipe({
  base: {
    width: "100%",
    minHeight: "160px",
    height: "100%",
    padding: "12px",
    border: `1px solid ${themeVars.colors.gray.gray200}`,
    backgroundColor: themeVars.colors.gray.gray0,
    fontSize: "15px",
    borderRadius: "8px",
    transition: "all .25s",
    outline: "none",
    resize: "vertical",
    "::placeholder": {
      color: themeVars.colors.gray.gray500,
    },
    ":focus": {
      border: `1px solid ${themeVars.colors.blue.blue300}`,
    },
  },
  variants: {
    active: {
      true: {
        color: themeVars.colors.gray.gray900,
        background: themeVars.colors.gray.gray0,
      },
    },
  },
});

export const charCount = style({
  position: "absolute",
  bottom: "12px",
  right: "12px",
});

export const errorText = style({
  margin: "5px",
});
