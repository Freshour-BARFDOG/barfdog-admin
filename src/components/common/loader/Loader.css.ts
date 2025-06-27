import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const loaderContainer = style({
	width: '100%',
	height: 'calc(100vh - 52px)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})

export const loaderBox = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})

const rotation = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' }
});

export const loader = recipe({
	base: {
		borderRadius: '50%',
		display: 'inline-block',
		boxSizing: 'border-box',
		animation: `${rotation} 1s linear infinite`,
	},
	variants: {
		size: {
			24: {
				width: '24px',
				height: '24px',
				border: '3px solid #FFF',
				borderBottomColor: themeVars.colors.red.red,
			},
			48: {
				width: '48px',
				height: '48px',
				border: '5px solid #FFF',
				borderBottomColor: themeVars.colors.red.red,
			}
		}
	}
})
