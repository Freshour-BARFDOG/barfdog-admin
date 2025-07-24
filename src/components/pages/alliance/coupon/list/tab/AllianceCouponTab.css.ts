import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const allianceCouponListTab = recipe({
	base: {
		padding: '8px 20px',
	},
	variants: {
		active: {
			true: {
				backgroundColor: themeVars.colors.gray.gray0,
			},
			false: {
				backgroundColor: themeVars.colors.gray.gray200,
			}
		}
	}

})