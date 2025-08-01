import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const loginContainer = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: themeVars.colors.gray.gray50,
});

export const loginCardWrapper = style({
  width: "400px",
});

export const loginLogo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const loginForm = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const loginControls = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
