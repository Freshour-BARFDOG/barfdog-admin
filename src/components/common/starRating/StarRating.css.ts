import { style } from '@vanilla-extract/css';

export const starRatingWrapper = style({
	display: 'flex',
	gap: 4,
});

export const starButtonStyle = style({
	background: 'transparent',
	border: 'none',
	padding: 0,
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
});
