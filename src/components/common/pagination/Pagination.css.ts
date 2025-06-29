import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const paginationContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0",
});

export const numberButton = recipe({
  base: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: themeVars.colors.gray.gray800,
    cursor: "pointer",
    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    active: {
      true: {
        borderRadius: "50%",
        background: themeVars.colors.gray.gray900,
      },
    },
    type: {
      next: { transform: "rotate(180deg)" },
    },
  },
});
