import { style } from '@vanilla-extract/css';
import { recipe } from "@vanilla-extract/recipes";

export const container = recipe({
	base: {
		height: 'auto',
	},
	variants: {
		width: {
			sm: { width: 'calc(30% - 10px)' },
			md: { width: 'calc((100% - 20px) / 2)' },
			lg: { width: 'calc(70% - 10px)' },
			full: { width: '100%' },
		}
	}
});

export const title = style({
	fontSize: '20px',
	fontWeight: 600,
});

export const grid = recipe({
	base: {
		display: 'grid',
		width: '100%',
		gap: '16px',
		alignItems: 'start',
	},
	variants: {
		columns: {
			1: {
				gridTemplateColumns: '1fr',
			},
			2: {
				gridTemplateColumns: '1fr 1px 1fr',
			},
			3: {
				gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
			},
		},
		layoutRatio: {
			equal: { },
			wideLeft: {
				gridTemplateColumns: '1fr 1px 30%',
			},
			wideRight: {
				gridTemplateColumns: '30% 1px 1fr',
			}
		},
	},
	compoundVariants: [
		{
			variants: {
				columns: 2,
				layoutRatio: 'equal',
			},
			style: {
				gridTemplateColumns: '1fr 1px 1fr',
			},
		},
		{
			variants: {
				columns: 2,
				layoutRatio: 'wideLeft',
			},
			style: {
				gridTemplateColumns: '1fr 1px 30%',
			},
		},
		{
			variants: {
				columns: 2,
				layoutRatio: 'wideRight',
			},
			style: {
				gridTemplateColumns: '30% 1px 1fr',
			},
		},
	]
});

export const rows = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
});

export const item = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const topInfo = style({
	width: '100%',
	height: '20px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const topInfoLeft = style({
	width: 'auto',
	height: '100%',
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	gap: '16px',
})