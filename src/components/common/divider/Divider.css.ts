import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const divider = recipe({
  base: {
    width: "100%",
    borderStyle: "solid", // 기본 border 스타일
    borderBottomStyle: "solid",
  },
  variants: {
    thickness: {
      1: { borderBottomWidth: "1px" },
      2: { borderBottomWidth: "2px" },
      4: { borderBottomWidth: "4px" },
      8: { borderBottomWidth: "8px" },
      12: { borderBottomWidth: "12px" },
    },
    color: {
      gray50: { borderBottomColor: themeVars.colors.gray.gray50 },
      gray100: { borderBottomColor: themeVars.colors.gray.gray100 },
      gray200: { borderBottomColor: themeVars.colors.gray.gray200 },
      gray300: { borderBottomColor: themeVars.colors.gray.gray300 },
      gray700: { borderBottomColor: themeVars.colors.gray.gray700 },
      // 필요한 색상 키를 모두 추가…
    },
  },
  defaultVariants: {
    thickness: 8,
    color: "gray50",
  },
});
