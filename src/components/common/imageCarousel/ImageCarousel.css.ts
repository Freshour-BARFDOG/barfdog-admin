import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const previewSlider = style({
	width: '100%',
})

globalStyle(`${previewSlider} .swiper-wrapper`, {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '4px',
})

export const previewSlide = style({
	position: 'relative',
	borderRadius: '8px',
	overflow: 'hidden',
	border: `1px solid ${themeVars.colors.gray.gray500}`,
	marginRight: 0,

})

export const previewImage = style({
	objectFit: 'cover',
})

export const thumbnail = style({
	background: themeVars.colors.red.red,
	color: themeVars.colors.gray.gray0,
	borderRadius: '6.667px 0px',
	position: 'absolute !important',
	left: 0,
	top: 0,
	padding: '3px 6.67px',
})

export const removeButton = style({
	position: 'absolute',
	right: '4px',
	top: '4px',
	cursor: 'pointer',
	borderRadius: '50%',
	backgroundColor: themeVars.colors.gray.gray0,
	width: '20px',
	height: '20px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})
