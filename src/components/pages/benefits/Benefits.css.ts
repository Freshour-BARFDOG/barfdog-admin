import { style } from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";

export const benefitForm = recipe({
	base: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	variants: {
		gap: {
			12: {
				gap: '12px',
			},
			16: {
				gap: '16px',
			},
			20: {
				gap: '20px',
			},
		}
	},
	defaultVariants: {
		gap: 20,
	}
})

export const benefitControls = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '4px',
	marginTop: '20px'
})

export const benefitInputBox = style({
	width: '100%',
	display: 'flex',
	gap: '10px',
	alignItems: 'center',
})

export const benefitInput = recipe({
	base: {
		width: '15%',
	},
	variants: {
		width: {
			auto: {
				width: 'auto'
			}
		}
	}
})