import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const menuList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	overflowY: 'auto',
	paddingBottom: '40px'
})

export const menuItem = recipe({
	base: {
		padding: '10px 16px',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		borderRadius: '8px',
	},
	variants: {
		active: {
			true: {
				backgroundColor: themeVars.colors.red.lightPink,
				color: themeVars.colors.red.red,
			},
			false: {
				selectors: {
					'&:hover': {
						backgroundColor: themeVars.colors.gray.gray200,
					},
				},
			}
		},
		sidebarCollapsed: {
			true: {
				padding: '12px 16px',
				justifyContent: 'center',
			},
		}
	},
});

export const submenu = style({
	padding: '0 0 0 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	marginTop: '8px',
});

export const submenuChildrenList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})

export const submenuChildren = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	marginBottom: '16px',
	selectors: {
		'&:first-child': {
			paddingTop: '8px',
		},
		'&:last-child': {
			marginBottom: 0,
		}
	}
})

export const menuCategory = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
})