import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const uploadBox = style({
  display: 'flex',
})

export const uploadLabel = style({
  width: '100px',
  height: '100px',
  backgroundColor: themeVars.colors.gray.gray100,
  border: `1px solid ${themeVars.colors.gray.gray500}`,
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: '4px',
})

export const uploadInfo = style({
  marginTop: '10px',
})

export const error = style({
  marginBottom: '20px',
})