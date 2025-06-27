import { themeVars } from "../styles/theme.css";

export type Colors =
  | "white"
  | "red"
  | "pastelRed"
  | "pinkWhite"
  | "gray900"
  | "gray800"
  | "gray700"
  | "gray600"
  | "gray500"
  | "gray300"
  | "gray200"
  | "gray100"
  | "gray50"
  | "gray0"
  | "blue500"
  | "blue400"
  | "blue300"
  | "blue200"
  | "green400"
  | "green500"
  | "yellow500"
  | "yellow400";

const COLORS: Record<Colors, string> = {
  white: themeVars.colors.gray.gray0,
  red: themeVars.colors.red.red,
  pastelRed: themeVars.colors.red.pastelRed,
  pinkWhite: themeVars.colors.red.pinkWhite,
  gray900: themeVars.colors.gray.gray900,
  gray800: themeVars.colors.gray.gray800,
  gray700: themeVars.colors.gray.gray700,
  gray600: themeVars.colors.gray.gray600,
  gray500: themeVars.colors.gray.gray500,
  gray300: themeVars.colors.gray.gray300,
  gray200: themeVars.colors.gray.gray200,
  gray100: themeVars.colors.gray.gray100,
  gray50: themeVars.colors.gray.gray50,
  gray0: themeVars.colors.gray.gray0,
  blue500: themeVars.colors.blue.blue500,
  blue400: themeVars.colors.blue.blue400,
  blue300: themeVars.colors.blue.blue300,
  blue200: themeVars.colors.blue.blue200,
  green400: themeVars.colors.green.green400,
  green500: themeVars.colors.green.green500,
  yellow500: themeVars.colors.yellow.yellow500,
  yellow400: themeVars.colors.yellow.yellow400,
} as const;

const CHIPS_COLORS = {
  red: themeVars.colors.red.red,
  lightPink: themeVars.colors.red.lightPink,
  pinkWhite: themeVars.colors.red.pinkWhite,
  gray100: themeVars.colors.gray.gray100,
  gray200: themeVars.colors.gray.gray200,
  gray600: themeVars.colors.gray.gray600,
  gray700: themeVars.colors.gray.gray700,
  gray800: themeVars.colors.gray.gray800,
  gray900: themeVars.colors.gray.gray900,
  blue50: themeVars.colors.blue.blue50,
  blue500: themeVars.colors.blue.blue500,
  blue600: themeVars.colors.blue.blue600,
  green500: themeVars.colors.green.green500,
  green50: themeVars.colors.green.green50,
  yellow500: themeVars.colors.yellow.yellow500,
} as const;

export { COLORS, CHIPS_COLORS };