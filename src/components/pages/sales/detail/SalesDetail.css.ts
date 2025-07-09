import { style } from "@vanilla-extract/css";

export const salesDetailGridWrapper = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  "@media": {
    "screen and (max-width: 1300px)": {
      gridTemplateColumns: "1fr",
    },
  },
});
