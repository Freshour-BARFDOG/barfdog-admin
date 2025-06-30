import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const table = recipe({
  base: {
    display: "grid",
    rowGap: "1rem",
    alignItems: "center",
    padding: "1.5rem",
  },
  variants: {
    columns: {
      1: { gridTemplateColumns: "max-content 1fr" },
      2: { gridTemplateColumns: "max-content 1fr max-content 1fr" },
      3: {
        gridTemplateColumns: "max-content 1fr max-content 1fr max-content 1fr",
      },
    },
  },
  defaultVariants: { columns: 2 },
});

// label, value 공통
export const label = style({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: themeVars.colors.gray.gray900,
  textAlign: "left",
});
export const value = style({
  fontSize: "0.875rem",
  fontWeight: 400,
  color: themeVars.colors.gray.gray900,
  textAlign: "left",
});

// fullWidth 플래그가 붙은 dt,dd 용
export const fullRow = style({
  // 1번 컬럼에서 시작해서 마지막 컬럼까지 span
  gridColumn: "1 / -1",
});
