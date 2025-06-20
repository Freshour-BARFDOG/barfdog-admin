import { style } from '@vanilla-extract/css';
import { themeVars } from "@/styles/theme.css";

export const sidebarMobileOverlay = style({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	zIndex: 900,
});

export const mainContent = style({
	minHeight: 'calc(100vh - 56px)',
	marginTop: 56,
	padding: 16,
	transition: 'margin-left 0.3s ease',
	marginLeft: 240,
	backgroundColor: themeVars.colors.gray.gray50,
});
