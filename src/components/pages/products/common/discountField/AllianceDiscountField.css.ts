import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const allianceDiscountFieldContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "16px",
  gap: "8px",
  borderRadius: "8px",
  border: `1px solid ${themeVars.colors.gray.gray200}`,
});
