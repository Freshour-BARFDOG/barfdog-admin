import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const optionTable = style({
  width: "100%",
  borderCollapse: "collapse",
});

export const th = style({
  border: `1px solid ${themeVars.colors.gray.gray200}`,
  padding: "12px",
  backgroundColor: themeVars.colors.gray.gray50,
  textAlign: "left",
  selectors: {
    "&:first-child": {
      width: "40%", // 첫 번째 열을 40%로 지정
    },
  },
});

export const td = style({
  border: `1px solid ${themeVars.colors.gray.gray200}`,
  padding: "8px",
  selectors: {
    "&:first-child": {
      width: "40%", // 첫 번째 열을 40%로 지정
    },
  },
});
