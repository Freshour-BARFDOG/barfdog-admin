import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const searchItemBox = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const searchItem = recipe({
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  variants: {
    align: {
      start: {
        alignItems: "start",
      },
      center: {},
    },
  },
});

export const searchItemLabel = style({
  minWidth: "150px",
});

export const searchItemInput = style({
  width: "100%",
});

export const searchButtonControls = style({
  width: "30%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  margin: "16px auto 0",
});
