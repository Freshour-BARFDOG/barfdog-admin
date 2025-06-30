import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const searchMemberModalContainer = style({
	minWidth: '70vw',
	maxHeight: '90vh',
	overflowY: 'scroll',
	display: 'flex',
	flexDirection: 'column',
})

export const searchMemberHeader = style({
	width: '100%',
	padding: '10px 20px',
	backgroundColor: themeVars.colors.gray.gray900,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const searchMemberContent = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	gap: '20px',
})

export const searchMemberControls = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '4px',
})

export const searchMemberButton = style({
	width: '30%',
	margin: '0 auto',
})
