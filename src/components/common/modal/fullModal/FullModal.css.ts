import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const modalContainer = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	alignItems: 'center',
	maxWidth: "600px",
	width: '100%',
	height: "100vh",
	backgroundColor: themeVars.colors.gray.gray0,
	overflowY: 'auto'
})

export const modalContent = style({
	width: '100%',
	backgroundColor: themeVars.colors.gray.gray50,
})