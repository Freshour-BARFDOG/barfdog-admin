import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const toastContainer = style({
  position: "fixed",
  zIndex: 1000,
  left: "50%",
  transform: "translateX(-50%)",
})

export const toastPosition = {
  bottom: style({
    bottom: '20px',
  }),
  top: style({
    top: '20px',
  })
}

export const toast = style({
  padding: '14px 12px 14px 20px',
  background: themeVars.colors.dimmed.gray80,
  color: themeVars.colors.gray.gray0,
  borderRadius: '8px',
  boxShadow: themeVars.shadow.normal,
  fontSize: '14px',
  textAlign: 'left',
  minWidth: '300px',
  width: 'auto',
  opacity: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});