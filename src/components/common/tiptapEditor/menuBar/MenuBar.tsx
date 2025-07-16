import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import * as styles from './MenuBar.css';
import {
	ImageIcon,
} from "lucide-react";
import { ChangeEvent, useCallback } from "react";
import HeadingDropdown from "@/components/common/tiptapEditor/menuBar/headingDropdown/HeadingDropdown";
import ColorControls from "@/components/common/tiptapEditor/menuBar/colorControls/ColorControls";
import TextControls from "@/components/common/tiptapEditor/menuBar/textControls/TextControls";

export interface EditorState {
	backgroundColor?: string;
	color?: string;
	isBold: boolean;
	canBold: boolean;
	isItalic: boolean;
	canItalic: boolean;
	isStrike: boolean;
	canStrike: boolean;
	isCode: boolean;
	canCode: boolean;
	canClearMarks: boolean;
	isParagraph: boolean;
	isHeading1: boolean;
	isHeading2: boolean;
	isHeading3: boolean;
	isHeading4: boolean;
	isHeading5: boolean;
	isHeading6: boolean;
	isBulletList: boolean;
	isOrderedList: boolean;
	isCodeBlock: boolean;
	isBlockquote: boolean;
}

interface MenuBarProps {
	editor: Editor;
	onImageUpload: (file: File) => Promise<string | undefined>;
}

export default function MenuBar({ editor, onImageUpload }: MenuBarProps) {
	const selector = useCallback((ctx: { editor: Editor }) => {
		return {
			backgroundColor: ctx?.editor?.getAttributes("textStyle").backgroundColor,
			color: ctx?.editor?.getAttributes("textStyle").color,
			isBold: ctx?.editor?.isActive("bold"),
			canBold: ctx?.editor?.can().chain().focus().toggleBold().run(),
			isItalic: ctx?.editor?.isActive("italic"),
			canItalic: ctx?.editor?.can().chain().focus().toggleItalic().run(),
			isStrike: ctx?.editor?.isActive("strike"),
			canStrike: ctx?.editor?.can().chain().focus().toggleStrike().run(),
			isCode: ctx?.editor?.isActive("code"),
			canCode: ctx?.editor?.can().chain().focus().toggleCode().run(),
			canClearMarks: ctx?.editor?.can().chain().focus().unsetAllMarks().run(),
			isParagraph: ctx?.editor?.isActive("paragraph"),
			isHeading1: ctx?.editor?.isActive("heading", { level: 1 }),
			isHeading2: ctx?.editor?.isActive("heading", { level: 2 }),
			isHeading3: ctx?.editor?.isActive("heading", { level: 3 }),
			isHeading4: ctx?.editor?.isActive("heading", { level: 4 }),
			isHeading5: ctx?.editor?.isActive("heading", { level: 5 }),
			isHeading6: ctx?.editor?.isActive("heading", { level: 6 }),
			isBulletList: ctx?.editor?.isActive("bulletList"),
			isOrderedList: ctx?.editor?.isActive("orderedList"),
			isCodeBlock: ctx?.editor?.isActive("codeBlock"),
			isBlockquote: ctx?.editor?.isActive("blockquote"),
		};
	}, []);

	const editorState = useEditorState({
		editor,
		selector,
	});

	const insertImage = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			if (!editor) return;
			const files = event.target.files;
			if (files && files[0]) {
				const url = await onImageUpload(files[0]);
				if (url) {
					editor.chain().focus().setImage({ src: url }).run();
				}
			}
		},
		[editor, onImageUpload]
	);

	return (
		<div className="control-group">
			<div className={styles.menuBar}>
				<ColorControls editor={editor} />
				<HeadingDropdown editor={editor} />
				<TextControls editor={editor} editorState={editorState} />
				<label htmlFor="image" className={styles.menuBarButton({ active: false })}>
					<input id='image' type="file" accept="image/*" onChange={insertImage} style={{ display: 'none' }} />
					<ImageIcon size={20} />
				</label>
			</div>
		</div>
	);
}
