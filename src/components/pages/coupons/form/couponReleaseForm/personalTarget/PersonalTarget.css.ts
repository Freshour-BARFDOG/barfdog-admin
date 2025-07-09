import { style } from "@vanilla-extract/css";

export const personalTargetControls = style({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	gap: '4px',
	marginBottom: '16px',
})

export const personalTargetTable = style({
	width: '100%',
	maxHeight: '50vh',
	overflowY: 'scroll',
	borderRadius: '8px',
})