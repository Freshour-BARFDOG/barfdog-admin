import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

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