import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const subscriptionListButton = style({
	backgroundColor: `${themeVars.colors.gray.gray0} !important`,
	borderRadius: '8px',
	borderTop: 'none !important',
})

export const subscriptionList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})