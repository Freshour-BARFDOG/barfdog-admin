import { style } from "@vanilla-extract/css";

export const couponForm = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '20px',
})

export const couponControls = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '4px',
	marginTop: '20px'
})

export const couponInputBox = style({
	width: '100%',
	display: 'flex',
	gap: '10px',
	alignItems: 'center',
})

export const couponInput = style({
	width: '15%',
})