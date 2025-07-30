import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const divider = recipe({
  base: {
    height: '100%',
    flexShrink: 0,
  },
  variants: {
    thickness: {
      1: { width: "1px" },
      2: { width: "2px" },
      4: { width: "4px" },
      8: { width: "8px" },
      12: { width: "12px" },
    },
    color: {
      gray50: { backgroundColor: themeVars.colors.gray.gray50 },
      gray100: { backgroundColor: themeVars.colors.gray.gray100 },
      gray200: { backgroundColor: themeVars.colors.gray.gray200 },
      gray300: { backgroundColor: themeVars.colors.gray.gray300 },
      gray700: { backgroundColor: themeVars.colors.gray.gray700 },
    },
  },
  defaultVariants: {
    thickness: 8,
    color: "gray50",
  },
});
