import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const modalContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: 'flex-start',
  width: '321px',
  minHeight: '166px',
  padding: '20px',
  gap: '28px',
  borderRadius: '8px',
  backgroundColor: themeVars.colors.gray.gray0,
  whiteSpace: 'pre-line',
})

export const modalContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: 'flex-start',
  width: '100%',
  gap: '8px',
})

export const modalContent = style({
  width: '100%',
})

export const modalButtonWrapper = style({
    display: "flex",
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: "stretch",
    gap: '8px'
})