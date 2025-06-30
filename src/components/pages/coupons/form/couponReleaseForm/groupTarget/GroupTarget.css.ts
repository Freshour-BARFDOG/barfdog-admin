import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const groupTarget = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '20px',
	padding: '20px',
	backgroundColor: themeVars.colors.gray.gray100,
})