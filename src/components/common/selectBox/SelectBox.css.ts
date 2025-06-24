import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const selectBox = style({
	display: 'inline-block',
	position: 'relative',
})

export const select = style({
	appearance: 'none',
	WebkitAppearance: 'none',
	MozAppearance: 'none',
	padding: '8px 36px 8px 12px',
	border: `1px solid ${themeVars.colors.gray.gray200}`,
	borderRadius: '4px',
	fontSize: themeVars.fontSize["text-sm"],
	backgroundColor: '#fff',
})

export const selectArrowIcon = style({
	transform: 'rotate(-90deg) translate(50%)',
	position: 'absolute',
	right: '8px',
	top: '50%',
})