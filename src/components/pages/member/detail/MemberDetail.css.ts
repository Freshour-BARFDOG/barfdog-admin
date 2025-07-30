import { style } from "@vanilla-extract/css";

export const detailInfoList = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, 1fr)",
	gap: "20px",
	"@media": {
		"screen and (max-width: 1300px)": {
			gridTemplateColumns: "1fr",
		},
	},
})

export const infoItemValue = style({
	width: '100%',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '4px',
	alignItems: 'center',
})
