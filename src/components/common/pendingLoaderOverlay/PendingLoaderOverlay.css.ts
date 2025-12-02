import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const paymentLoaderContainer = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "12px",
  zIndex: 300,
  backgroundColor: themeVars.colors.dimmed.gary60,
});
