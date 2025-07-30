import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const imageList = recipe({
	base: {
		width: '100%',
		position: 'relative',
		boxShadow: themeVars.shadow.normal,
	},
	variants: {
		showPadding: {
			true: {
				padding: '20px',
			},
			false: {
				padding: 0,
			}
		}
	}
})

export const imageSlider = style({
	width: '100%',
	height: 'auto !important',
	position: 'relative',
	borderRadius: '8px',
	display: 'flex !important',
})

export const image = style({
	width: '100%',
	height: 'auto',
	objectFit: 'cover',
	borderRadius: '8px',
})

export const imageCountChip = style({
	position: 'absolute',
	top: '16px',
	right: '16px',
})