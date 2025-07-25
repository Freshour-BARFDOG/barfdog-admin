import { recipe } from "@vanilla-extract/recipes";

export const labelCheckedBoxContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
    gap: "8px",
    flexShrink: 0,
  },
  variants: {
    disabled: {
      true: {
        cursor: "default"
      },
      false: {
        cursor: "pointer",
      }
    }
  }
});
