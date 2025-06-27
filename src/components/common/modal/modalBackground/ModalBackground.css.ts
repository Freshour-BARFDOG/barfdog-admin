import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const modalBackground = recipe({
  base: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  variants: {
    isDimmed: {
      true: {
        backgroundColor: themeVars.colors.dimmed.gary60,
      },
      false: {},
    },
  },
});

export const modalContent = style({
  background: themeVars.colors.gray.gray0,
  padding: "20px",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "300px",
  height: "300px",
  overflowY: "auto",
});
