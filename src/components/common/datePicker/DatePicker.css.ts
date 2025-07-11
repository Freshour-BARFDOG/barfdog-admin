import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const dateRageInput = style({
	minWidth: '150px',
	height: '36px',
	padding: '4px 12px',
	border: `1px solid ${themeVars.colors.gray.gray200}`,
	borderRadius: '4px',
	fontSize: themeVars.fontSize["text-sm"],
	backgroundColor: themeVars.colors.gray.gray0,
	selectors: {
		'&:focus': {
			border: `1px solid ${themeVars.colors.red.red}`
		}
	}
})