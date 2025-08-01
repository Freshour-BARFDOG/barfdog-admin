import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const cancelOrderModalContainer = style({
  backgroundColor: themeVars.colors.gray.gray0,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  width: "50%",
  height: "300px",
  overflowY: "auto",
  gap: "20px",
  position: "relative",
});

export const orderDetailModalContainer = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: themeVars.colors.gray.gray0,
  borderRadius: "8px",
  padding: "20px",
  width: "550px",
  height: "60%",
  overflowY: "auto",
  gap: "12px",
  position: "relative",
});
