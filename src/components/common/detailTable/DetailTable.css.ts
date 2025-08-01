import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const tableContainer = style({
  width: "100%",
});

export const tableTitle = style({
  marginBottom: "8px",
});
export const table = recipe({
  base: {
    display: "grid",
    width: "100%",
    alignItems: "center",
    gap: "1px",
    backgroundColor: themeVars.colors.gray.gray400,
    borderRadius: "6px",
    outline: `1px solid ${themeVars.colors.gray.gray400}`,

    // 600px 이하에서는 무조건 columns=1 레이아웃 적용
    "@media": {
      "screen and (max-width: 600px)": {
        gridTemplateColumns: "max-content 1fr",
      },
    },
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
  backgroundColor: themeVars.colors.blue.blue100,
  textAlign: "left",
  padding: "8px 10px",
  height: "100%",
});
export const value = style({
  fontSize: "0.875rem",
  fontWeight: 400,
  color: themeVars.colors.gray.gray900,
  backgroundColor: themeVars.colors.gray.gray0,
  textAlign: "left",
  padding: "8px 10px",
  height: "100%",
});

// fullWidth일 때 dt만 차지할 컬럼
export const fullLabel = style({
  // 첫 번째 컬럼에만 위치
  gridColumn: "1 / 2",
});

// fullWidth일 때 dd만 차지할 컬럼
export const fullValue = style({
  // 두 번째 컬럼부터 끝까지
  gridColumn: "2 / -1",
});

// dd, dt align 추가
export const align = recipe({
  base: { display: "flex" },
  variants: {
    align: {
      center: { alignItems: "center" },
      start: { alignItems: "flex-start" },
    },
  },
});
