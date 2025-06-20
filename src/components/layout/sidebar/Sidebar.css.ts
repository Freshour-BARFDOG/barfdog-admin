import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const sidebar = style({
	position: 'fixed',
	top: 0,
	left: 0,
	height: '100vh',
	backgroundColor: themeVars.colors.gray.gray0,
	padding: '16px 16px 56px',
	overflowY: 'scroll',
	transition: 'width 0.3s ease, transform 0.3s ease',
	borderRight: `1px solid ${themeVars.colors.gray.gray200}`,
});

export const sidebarExpanded = style({ width: 240 });
export const sidebarCollapsed = style({ width: 64 });