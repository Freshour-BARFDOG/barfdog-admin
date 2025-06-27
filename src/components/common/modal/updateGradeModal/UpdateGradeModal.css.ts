import { style } from "@vanilla-extract/css";

export const changeGradeContainer = style({
	minWidth: '300px',
})

export const changeGradeSelectBox = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '8px',
})

export const changeGradeControls = style({
	width: '100%',
	display: 'flex',
	gap: '8px',
})