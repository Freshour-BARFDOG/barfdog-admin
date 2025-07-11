import { style } from '@vanilla-extract/css';
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from '@/styles/theme.css';

export const tableWrapper = style({
	width: '100%',
	overflowX: 'auto',
	boxShadow: themeVars.shadow.light,
	borderRadius: '16px',
	border: `1px solid ${themeVars.colors.gray.gray300}`,
});

export const table = style({
	overflowX: 'auto',
	width: '100%',
	minWidth: '1000px',
	borderCollapse: 'separate',
	borderSpacing: 0,
})

export const tableHead = style({
	padding: '12px',
	fontWeight: 'bold',
	backgroundColor: themeVars.colors.gray.gray100,
	textAlign: 'center',
	borderBottom: `1px solid ${themeVars.colors.gray.gray300}`,
	selectors: {
		'&:not(:last-child)': {
			borderRight: `1px solid ${themeVars.colors.gray.gray300}`,
		},
	},
});

export const tableBody = style({
	backgroundColor: themeVars.colors.gray.gray0,
});

export const tableCell = recipe({
	base: {
		padding: '14px 12px',
		whiteSpace: 'nowrap',
		textAlign: 'center',
		verticalAlign: 'middle',
		borderBottom: `1px solid ${themeVars.colors.gray.gray300}`,
		selectors: {
			'&:not(:last-child)': {
				borderRight: `1px solid ${themeVars.colors.gray.gray300}`,
			},
		},
	},
	variants: {
		isLastRow: {
			true: {
				borderBottom: 0,
			}
		},
	}
});