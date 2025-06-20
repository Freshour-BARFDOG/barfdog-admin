import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const header = style({
	height: 56,
	display: 'flex',
	alignItems: 'center',
	backgroundColor: themeVars.colors.gray.gray0,
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	zIndex: 999,
});

export const headerRight = recipe({
	base: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 16px',
		borderBottom: `1px solid ${themeVars.colors.gray.gray200}`
	},
	variants: {
		isMobile: {
			true: {
				width: '100%',
			},
			false: {
				width: 'calc(100% - 240px)',
			}
		}
	}
});

export const logo = style({
	width: 240,
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const menuButton = style({
	width: 24,
	height: 24,
	cursor: 'pointer',
});