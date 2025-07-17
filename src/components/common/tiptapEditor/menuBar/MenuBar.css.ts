import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const menuBarContainer = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '16px',
	background: themeVars.colors.gray.gray0,
})

export const menuBar = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})

export const menuBarButton = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		border: `1px solid ${themeVars.colors.gray.gray300}`,
		background: themeVars.colors.gray.gray0,
		borderRadius: '8px',
		padding: '4px',
		transition: 'all 0.2s ease',
	},
	variants: {
		active: {
			true: {
				background: themeVars.colors.blue.blue500,	
				color: themeVars.colors.gray.gray0,	
			},
			false: {
				selectors: {
					"&:hover": {
						background: themeVars.colors.gray.gray100,	
						color: themeVars.colors.gray.gray900,	
					},
				},
			}
		},
	},
});

export const dropdown = style({
	position: "relative",
	marginRight: "8px",
});

export const dropdownMenu = style({
	position: "absolute",
	left: 0,
	top: "110%",
	background: "#fff",
	borderRadius: "10px",
	boxShadow: "0 4px 16px rgba(30, 41, 59, 0.12)",
	minWidth: "180px",
	zIndex: 10,
	padding: "8px 0",
	marginTop: "4px",
});

export const dropdownMenuItem = recipe({
	base: {
		width: "100%",
		textAlign: "left",
		padding: "8px 16px",
		border: "none",
		borderRadius: "0",
		fontSize: "16px",
		cursor: "pointer",
	},
	variants: {
		active: {
			true: {
				background: themeVars.colors.gray.gray100,
				color: themeVars.colors.blue.blue500,
				fontWeight: 600,
			},
			false: {
				background: "none",
				color: themeVars.colors.gray.gray900,
				fontWeight: 400,
				selectors: {
					"&:hover": {
						background: themeVars.colors.gray.gray100,
					},
				},
			}
		},
	},
})