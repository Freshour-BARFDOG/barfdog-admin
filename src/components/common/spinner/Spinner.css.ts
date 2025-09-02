import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const spinnerContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  variants: {
    fullscreen: {
      true: { height: "calc(100vh - 52px)" },
    },
  },
});

export const spinner = recipe({
  base: {
    position: "relative",

    display: "inline-block",
  },
  variants: {
    size: {
      md: { width: "64px", height: "64px" },
      sm: { width: "56px", height: "56px" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const spinnerOuter = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  animation: `${rotate} 0.8s linear infinite`,
});

export const spinnerInner = recipe({
  base: {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
  },
  variants: {
    size: {
      md: { width: "24px", height: "24px" },
      sm: { width: "16px", height: "16px" },
    },
  },
  defaultVariants: { size: "md" },
});
