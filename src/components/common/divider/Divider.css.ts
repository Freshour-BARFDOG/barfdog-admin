import { styleVariants } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const dividerBase = styleVariants({
  horizontal: {
    width: "100%",
  },
  vertical: {
    height: "70%",
    marginTop: "auto",
    marginBottom: "auto",
  },
});

export const thicknessVariants = {
  horizontal: styleVariants({
    1: { borderBottom: `1px solid ${themeVars.colors.gray.gray50}` },
    2: { borderBottom: `2px solid ${themeVars.colors.gray.gray50}` },
    4: { borderBottom: `4px solid ${themeVars.colors.gray.gray50}` },
    8: { borderBottom: `8px solid ${themeVars.colors.gray.gray50}` },
    12: { borderBottom: `12px solid ${themeVars.colors.gray.gray50}` },
  }),
  vertical: styleVariants({
    1: { borderLeft: `1px solid ${themeVars.colors.gray.gray50}` },
    2: { borderLeft: `2px solid ${themeVars.colors.gray.gray50}` },
    4: { borderLeft: `4px solid ${themeVars.colors.gray.gray50}` },
    8: { borderLeft: `8px solid ${themeVars.colors.gray.gray50}` },
    12: { borderLeft: `12px solid ${themeVars.colors.gray.gray50}` },
  }),
};
