import { style } from '@vanilla-extract/css';
import { themeVars } from "@/styles/theme.css";

export const wrapper = style({
	position: 'relative',
	display: 'inline-flex',
});

export const tooltip = style({
	position: 'absolute',
	backgroundColor: '#000',
	color: '#fff',
	padding: '10px',
	fontSize: '13px',
	fontWeight: themeVars.fontWeight.light,
	borderRadius: '4px',
	letterSpacing: 'normal',
	whiteSpace: 'nowrap',
	zIndex: 900,
	opacity: 0.9,
	transition: 'opacity 0.2s',
	lineHeight: 2,
});

export const position = {
	top: style({
		bottom: '100%',
		left: '50%',
		transform: 'translateX(-50%)',
		marginBottom: '6px',
	}),
	bottom: style({
		top: '100%',
		left: '50%',
		transform: 'translateX(-50%)',
		marginTop: '6px',
	}),
	left: style({
		right: '100%',
		top: '50%',
		transform: 'translateY(-50%)',
		marginRight: '6px',
	}),
	right: style({
		left: '100%',
		top: '50%',
		transform: 'translateY(-50%)',
		marginLeft: '6px',
	}),
};
