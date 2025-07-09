import { style } from "@vanilla-extract/css";

export const benefitForm = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '20px',
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

export const benefitInput = style({
	width: '15%',
})