import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const selectBox = recipe({
  base: {
    display: "inline-block",
    position: "relative",
  },
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {},
    }
  }
});

export const select = recipe({
  base: {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    padding: "8px 36px 8px 12px",
    border: `1px solid ${themeVars.colors.gray.gray200}`,
    borderRadius: "4px",
    fontSize: themeVars.fontSize["text-sm"],
    color: themeVars.colors.gray.gray900,
    backgroundColor: themeVars.colors.gray.gray0,
    minWidth: 170,
  },
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {},
    }
  }
});

export const selectArrowIcon = style({
  transform: "rotate(-90deg) translate(50%)",
  position: "absolute",
  right: "8px",
  top: "50%",
});
