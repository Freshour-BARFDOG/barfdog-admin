import { recipe } from "@vanilla-extract/recipes";

export const formContainer = recipe({
	base: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	variants: {
		gap: {
			12: {
				gap: '12px',
			},
			16: {
				gap: '16px',
			},
			20: {
				gap: '20px',
			},
		}
	},
	defaultVariants: {
		gap: 20,
	}
})
