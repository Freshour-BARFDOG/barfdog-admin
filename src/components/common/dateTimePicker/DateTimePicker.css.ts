import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const dateRageInput = style({
	width: '150px',
	padding: '4px 12px',
	border: `1px solid ${themeVars.colors.gray.gray300}`,
	borderRadius: '4px',
	fontSize: themeVars.fontSize["text-sm"],
	selectors: {
		'&:focus': {
			border: `1px solid ${themeVars.colors.red.red}`
		}
	}
})