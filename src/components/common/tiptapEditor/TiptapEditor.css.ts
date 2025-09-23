import { style, globalStyle } from '@vanilla-extract/css';
import { themeVars } from "@/styles/theme.css";

export const tiptapEditorContainer = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	borderRadius: '12px',
	overflow: 'hidden',
	border: `1px solid ${themeVars.colors.gray.gray200}`
});

export const tiptapEditor = style({
	padding: '16px',
	minHeight: '300px',
	maxHeight: '80vh',
	overflowY: 'scroll',
	fontSize: '1rem',
	backgroundColor: themeVars.colors.gray.gray0,
});

globalStyle(`${tiptapEditor} img`, {
	width: 'auto',
	maxWidth: '100%',
});

globalStyle(`${tiptapEditor} .ProseMirror`, {
	outline: 'none'
});

// 목록 스타일 복구
globalStyle(`${tiptapEditor} ul`, {
	listStyle: 'disc',
	paddingLeft: '1.5rem',
});

globalStyle(`${tiptapEditor} ol`, {
	listStyle: 'decimal',
	paddingLeft: '1.5rem',
});

globalStyle(`${tiptapEditor} li`, {
	marginBottom: '0.4rem',
});

// 제목 스타일 복구
globalStyle(`${tiptapEditor} h1`, {
	fontSize: '1.5rem',
	margin: '1.5rem 0 1rem',
});

globalStyle(`${tiptapEditor} h2`, {
	fontSize: '1.25rem',
	margin: '1.4rem 0 0.9rem',
});

globalStyle(`${tiptapEditor} p`, {
	margin: '1rem 0',
});

globalStyle(`${tiptapEditor} a`, {
	textDecoration: 'underline',
});

// blockquote 스타일 복구
globalStyle(`${tiptapEditor} blockquote`, {
	borderLeft: '4px solid #ccc',
	paddingLeft: '1rem',
	fontStyle: 'italic',
	color: '#555',
	margin: '1.5rem 0',
});

globalStyle(`${tiptapEditor} code`, {
	padding: '4px 8px',
	borderRadius: '4px',
	color: themeVars.colors.red.pastelRed,
	background: themeVars.colors.gray.gray200,
});

// HardBreak (줄바꿈) 스타일
globalStyle(`${tiptapEditor} .hard-break`, {
	display: 'block',
	margin: '0.5rem 0',
});

// Paragraph 스타일
globalStyle(`${tiptapEditor} .paragraph`, {
	margin: '1rem 0',
});
