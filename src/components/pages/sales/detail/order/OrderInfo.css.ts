import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const infoList = style({
  display: "grid",
  gridTemplateColumns: "max-content 1fr max-content 1fr",
  rowGap: "1rem",
  columnGap: "2rem",
  alignItems: "center",
  padding: "1.5rem",
});

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
