import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const inputWrapper = style({
  width: "170px",
});

export const switchWrapper = style({
  display: "flex",
  height: "36px",
  border: `1px solid ${themeVars.colors.gray.gray200}`,
  borderRadius: "8px",
  overflow: "hidden",
});

export const switchButton = recipe({
  base: {
    flex: 1,
    padding: "4px 8px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: themeVars.colors.gray.gray200,
  },
  variants: {
    active: {
      true: {
        backgroundColor: themeVars.colors.red.red,
      },
      false: {
        backgroundColor: themeVars.colors.gray.gray0,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
