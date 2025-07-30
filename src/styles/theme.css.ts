import { createTheme } from "@vanilla-extract/css";

export const [themeClass, themeVars] = createTheme({
  fontWeight: {
    light: "400",
    normal: "500",
    semibold: "600",
    bold: "700",
  },
  fontSize: {
    "title-xxl": "28px",
    "title-xl": "26px",
    "title-lg": "24px",
    "title-md": "22px",
    "title-sm": "20px",
    "text-xl": "20px",
    "text-lg": "18px",
    "text-md": "16px",
    "text-sm": "14px",
    "text-xs": "12px",
    "text-2xs": "10px",
  },
  // ------------------ color 디자인 시스템 ------------------
  colors: {
    red: {
      redDark: "#A90910",
      red: "#BE1A21",
      pastelRed: "#E5696E",
      lightRed: "#F1A3A6",
      pastelPink: "#FBD7D8",
      lightPink: "#FFEEEE",
      pinkWhite: "#FFFAFA",
    },
    blue: {
      blue600: "#006BEE",
      blue500: "#0274FF",
      blue400: "#3992FF",
      blue300: "#78B5FF",
      blue200: "#A4CDFF",
      blue100: "#CFE5FF",
      blue50: "#ECF5FF",
    },
    yellow: {
      yellow600: "#FFC200",
      yellow500: "#FFCD2D",
      yellow400: "#FFDD70",
      yellow300: "#FFE592",
      yellow200: "#FFF0BF",
      yellow100: "#FFF4DE",
      yellow50: "#FFFAF0",
    },
    green: {
      green600: "#06AE62",
      green500: "#24BB77",
      green400: "#5CCC9A",
      green300: "#95DEBD",
      green200: "#C5EDDB",
      green100: "#E6F7EF",
      green50: "#F2FBF7",
    },
    gray: {
      gray900: "#2B2B2B",
      gray800: "#454545",
      gray700: "#626262",
      gray600: "#7C7C7C",
      gray500: "#959595",
      gray400: "#B3B3B3",
      gray300: "#CCCCCC",
      gray200: "#EEEEEE",
      gray100: "#F1F2F4",
      gray50: "#F8F9FB",
      gray0: "#FFFFFF",
    },
    dimmed: {
      gray80: "rgba(43, 43, 43, 0.8)",
      gary60: "rgba(43, 43, 43, 0.6)",
      gray30: "rgba(43, 43, 43, 0.3)",
      red50: "rgba(190, 26, 33, 0.5)",
      red30: "rgba(190, 26, 33, 0.3)",
      red15: "rgba(190, 26, 33, 0.15)",
    },
    kakao: "#FDDC3F",
    naver: "#00C73C",
    chart: {
      orange: "#ff7300",
      red: "#ff2600",
      blue: "#413ea0",
      purple: "#8884d8",
    }
  },
  // ------------------ colors 디자인 시스템 ------------------

  // typography 디자인 시스템
  typography: {
    display: {
      display1: {
        fontWeight: "700",
        fontSize: "40px",
        lineHeight: "160%",
        letterSpacing: "-0.6px",
      },
      display2: {
        fontWeight: "700",
        fontSize: "32px",
        lineHeight: "150%",
        letterSpacing: "-0.6px",
      },
    },
    title: {
      title1: {
        fontWeight: "700",
        fontSize: "28px",
        lineHeight: "150%",
        letterSpacing: "-0.6px",
      },
      title2: {
        fontWeight: "700",
        fontSize: "24px",
        lineHeight: "150%",
        letterSpacing: "-0.6px",
      },
      title3: {
        fontWeight: "700",
        fontSize: "22px",
        lineHeight: "150%",
        letterSpacing: "-0.6px",
      },
      title4: {
        fontWeight: "700",
        fontSize: "20px",
        lineHeight: "150%",
        letterSpacing: "-0.6px",
      },
    },
    headline: {
      headline1: {
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "150%",
        letterSpacing: "-0.4px",
      },
      headline2: {
        fontWeight: "700",
        fontSize: "16px",
        lineHeight: "148%",
        letterSpacing: "-0.4px",
      },
      headline3: {
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "148%",
        letterSpacing: "-0.4px",
      },
      headline4: {
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "-0.4px",
      },
    },
    label: {
      label1: {
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "150%",
        letterSpacing: "-0.4px",
      },
      label2: {
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "148%",
        letterSpacing: "-0.4px",
      },
      label3: {
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "-0.4px",
      },
      label4: {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "-0.4px",
      },
    },
    body: {
      body1: {
        fontWeight: "400",
        fontSize: "18px",
        lineHeight: "150%",
        letterSpacing: "-0.4px",
      },
      body2: {
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "148%",
        letterSpacing: "-0.4px",
      },
      body3: {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "-0.4px",
      },
      caption: {
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "140%",
        letterSpacing: "-0.4px",
      },
      caption2: {
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "140%",
        letterSpacing: "-0.4px",
      },
    },
  },
  shadow: {
    light:
      "-1px -1px 1px 0px rgba(255, 255, 255, 0.08) inset, 0px 0px 1px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)",
    normal:
      "-1px -1px 2px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
    strong:
      "-1px -1px 2px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 8px 0px rgba(0, 0, 0, 0.08), 0px 10px 20px 0px rgba(0, 0, 0, 0.10)",
  },
});
