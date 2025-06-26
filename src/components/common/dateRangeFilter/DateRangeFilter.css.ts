import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const presetButtonBox = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	marginBottom: '10px',
})

export const presetButton = recipe({
	base: {
		padding: '6px 12px',
		height: '36px',
		borderRadius: 4,
		cursor: 'pointer',
		backgroundColor: themeVars.colors.gray.gray0,
		border: `1px solid ${themeVars.colors.gray.gray200}`,
	},
	variants: {
		active: {
			true: {
				border: `1px solid ${themeVars.colors.red.red}`,
				color: themeVars.colors.red.red,
			}
		}
	}
})

export const dateRageBox = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})