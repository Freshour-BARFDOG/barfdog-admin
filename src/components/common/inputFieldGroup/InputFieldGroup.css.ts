import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const inputFieldGroup = recipe({
	base: {
		width: '100%',
		display: 'flex',
	},
	variants: {
		align: {
			start: {
				alignItems: 'flex-start',
			},
			center: {
				alignItems: 'center',
			}
		}
	}
})

export const inputFieldGroupLabel = style({
	minWidth: '150px',
})
