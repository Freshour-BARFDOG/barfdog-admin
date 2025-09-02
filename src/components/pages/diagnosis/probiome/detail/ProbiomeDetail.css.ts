import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const petDefecationImage = style({
  borderRadius: 8,
  objectFit: "cover",
});

export const iconWrapper = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "20px",
  height: "100%",
});

export const probiomeStatusContainer = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  border: `1px solid ${themeVars.colors.blue.blue300}`,
  backgroundColor: themeVars.colors.blue.blue50,
  borderRadius: 16,
  padding: "16px",
  width: "100%",
  gap: "8px",
});
