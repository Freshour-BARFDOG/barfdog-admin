import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const chartLegend = style({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	gap: '8px 10px',
	marginTop: '16px',
})

export const legendColor = style({
	display: 'inline-block',
	width: 16,
	height: 16,
})

export const legendColorCircle = style({
	borderRadius: '50%',
})

export const barChartTooltip = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	padding: '10px',
	backgroundColor: themeVars.colors.gray.gray0,
	border: `1px solid ${themeVars.colors.gray.gray300}`,
	borderRadius: '8px'
})