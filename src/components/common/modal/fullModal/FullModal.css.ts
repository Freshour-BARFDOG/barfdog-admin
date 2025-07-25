import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const modalContainer = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	alignItems: 'center',
	maxWidth: "600px",
	width: 'auto',
	overflowY: 'auto'
})

export const modalHeader = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	padding: '10px 20px',
	backgroundColor: themeVars.colors.gray.gray900,
	color: themeVars.colors.gray.gray0,
})

export const modalContent = recipe({
	base: {
		width: '100%',
	},
	variants: {
		padding: {
			'none': {},
			16: { padding: '16px' },
			20: { padding: '20px' },
		}
	}
})