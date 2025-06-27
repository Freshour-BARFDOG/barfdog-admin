import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const infoList = recipe({
	base: {
		width: '100%',
		display: 'flex',
		gap: '16px',
		marginTop: '20px',
	},
	variants: {
		direction: {
			row: {
				flexDirection: 'row',
				flexWrap: 'wrap',
			},
			col: {
				flexDirection: 'column',
			}
		}
	}
})

export const infoItem = recipe({
	base: {
		display: 'flex',
		gap: '4px',
	},
	variants: {
		direction: {
			row: {
				width: '49%',
			},
			col: {
			}
		},
		align: {
			center: {
				alignItems: 'center',
			},
			start: {
				alignItems: 'flex-start',
			},
		}
	}
})

export const infoLabel = style({
	minWidth: '150px',
})
