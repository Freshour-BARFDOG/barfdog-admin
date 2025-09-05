import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const kitModalContainer = style({
  maxWidth: "420px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "40px",
  backgroundColor: themeVars.colors.gray.gray0,
  padding: "40px",
  borderRadius: "8px",
});
