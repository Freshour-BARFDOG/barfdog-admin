import { themeVars } from "./theme.css";
import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const ellipsis = recipe({
  base: {
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  variants: {
    lineSize: {
      line1: {
        display: "block",
        whiteSpace: "nowrap",
        webkitLineClamp: "none",
        webkitBoxOrient: "none",
        lineHeight: "normal",
      },
      line2: {
        display: "-webkit-box !important",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "2",
      },
      line3: {
        display: "-webkit-box !important",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "3",
      },
      line4: {
        display: "-webkit-box !important",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "4",
      },
      line5: {
        display: "-webkit-box !important",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "5",
      },
    },
    wordBreak: {
      keep: {
        wordBreak: "keep-all",
      },
    },
    whiteSpace: {
      pre: {
        whiteSpace: "pre-line",
      },
    },
    align: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "left",
      },
    },
  },
});

export const pointColor = style({ color: themeVars.colors.red.red });


export const sanitizedHTML = style({});

globalStyle(`${sanitizedHTML} *`, {
  textAlign: "unset",
  font: "auto",
});

globalStyle(`${sanitizedHTML} img`, {
  width: "100%",
  maxWidth: "600px",
  height: "auto",
  display: "block",
  margin: "0 auto",
});

globalStyle(`${sanitizedHTML} h2`, {
  fontSize: themeVars.fontSize["title-md"],
});

globalStyle(`${sanitizedHTML} b, strong`, {
  fontWeight: themeVars.fontWeight.bold,
});

export const commonWrapper = recipe({
  base: {
    display: "flex",
  },
  variants: {
    gap: {
      none: {},
      2: {
        gap: "2px",
      },
      4: {
        gap: "4px",
      },
      6: {
        gap: "6px",
      },
      8: {
        gap: "8px",
      },
      12: {
        gap: "12px",
      },
      16: {
        gap: "16px",
      },
      18: {
        gap: "18px",
      },
      20: {
        gap: "20px",
      },
      32: {
        gap: "32px",
      },
      40: {
        gap: "40px",
      },
    },
    padding: {
      none: {},
      12: {
        padding: "12px",
      },
      16: {
        padding: "16px",
      },
      20: {
        padding: "20px",
      },
      32: {
        padding: "32px 20px",
      },
      40: {
        padding: "40px",
      },
      "20/16": {
        padding: "20px 16px",
      },
      "0/20": {
        padding: "0 20px",
      },
    },
    direction: {
      col: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },
    justify: {
      center: {
        justifyContent: "center",
      },
      start: {
        justifyContent: "flex-start",
      },
      between: {
        justifyContent: "space-between",
      },
      end: {
        justifyContent: "flex-end",
      },
    },
    align: {
      center: {
        alignItems: "center",
      },
      start: {
        alignItems: "flex-start",
      },
      between: {
        alignItems: "space-between",
      },
      end: {
        alignItems: "flex-end",
      },
    },
    height: {
      auto: {
        height: "auto",
      },
      full: {
        height: "100vh",
      },
    },
    backgroundColors: {
      none: {},
      transparent: {
        backgroundColor: "transparent",
      },
      gray0: {
        backgroundColor: themeVars.colors.gray.gray0,
      },
      gray50: {
        backgroundColor: themeVars.colors.gray.gray50,
      },
      gray100: {
        backgroundColor: themeVars.colors.gray.gray100,
      },
    },
    textAlign: {
      none: {},
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
    },
    width: {
      full: {
        width: "100%",
      },
      half: {
        width: "50%",
      },
      auto: {
        width: "auto",
      },
    },
    borderRadius: {
      none: {},
      8: {
        borderRadius: "8px",
      },
      12: {
        borderRadius: "12px",
      },
      16: {
        borderRadius: "16px",
      },
    },
    shadow: {
      none: {},
      light: {
        boxShadow: themeVars.shadow.light,
      },
      normal: {
        boxShadow: themeVars.shadow.normal,
      },
      strong: {
        boxShadow: themeVars.shadow.strong,
      },
    },
    wrap: {
      wrap: {
        flexWrap: "wrap",
      },
      nowrap: {},
    },
  },
  defaultVariants: {
    gap: "none",
    padding: "none",
    direction: "row",
    justify: "center",
    align: "center",
    height: "auto",
    backgroundColors: "none",
    width: "full",
    borderRadius: "none",
    textAlign: "none",
    shadow: "none",
    wrap: "nowrap",
  },
});

export const discountUnitButton = recipe({
  base: {
    borderRadius: 'unset',
    border: `1px solid ${themeVars.colors.gray.gray200}`,
    padding: '8px 12px',
    transition: 'all .35s',
    cursor: 'pointer',
    selectors: {
      '&:first-child': {
        borderRight: 0,
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
      },
      '&:last-child': {
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
      },
    }
  },
  variants: {
    active: {
      true: {
        border: `1px solid ${themeVars.colors.red.red}`,
        color: themeVars.colors.red.red,
        '&:first-child': {
          borderRight: `1px solid ${themeVars.colors.red.red}`,
        },
      },
      false: {
        '&:last-child': {
          borderLeft: 0,
        },
      },
    }
  }
})

export const fullWidth = style({
  width: '100%',
})