import * as styles from "@/components/common/tiptapEditor/menuBar/MenuBar.css";
import {
	Bold,
	Braces,
	Code,
	Italic,
	List,
	ListOrdered,
	MessageSquareQuote,
	Minus,
	Pilcrow,
	Strikethrough
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { EditorState } from "@/components/common/tiptapEditor/menuBar/MenuBar";

interface TextControlsProps {
	editor: Editor;
	editorState: EditorState;
}

export default function TextControls({ editor, editorState }: TextControlsProps) {
	const controls = [
		{
			key: "Bold",
			icon: <Bold size={20} />,
			onClick: () => editor?.chain().focus().toggleBold().run(),
			disabled: !editorState.canBold,
			active: editorState.isBold,
		},
		{
			key: "Italic",
			icon: <Italic size={20} />,
			onClick: () => editor?.chain().focus().toggleItalic().run(),
			disabled: !editorState.canItalic,
			active: editorState.isItalic,
		},
		{
			key: "Strike",
			icon: <Strikethrough size={20} />,
			onClick: () => editor?.chain().focus().toggleStrike().run(),
			disabled: !editorState.canStrike,
			active: editorState.isStrike,
		},
		{
			key: "Code",
			icon: <Code size={20} />,
			onClick: () => editor?.chain().focus().toggleCode().run(),
			disabled: !editorState.canCode,
			active: editorState.isCode,
		},
		{
			key: "Paragraph",
			icon: <Pilcrow size={20} />,
			onClick: () => editor?.chain().focus().setParagraph().run(),
			disabled: false,
			active: editorState.isParagraph,
		},
		{
			key: "List",
			icon: <List size={20} />,
			onClick: () => editor?.chain().focus().toggleBulletList().run(),
			disabled: false,
			active: editorState.isBulletList,
		},
		{
			key: "OrderedList",
			icon: <ListOrdered size={20} />,
			onClick: () => editor?.chain().focus().toggleOrderedList().run(),
			disabled: false,
			active: editorState.isOrderedList,
		},
		{
			key: "CodeBlock",
			icon: <Braces size={20} />,
			onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
			disabled: false,
			active: editorState.isCodeBlock,
		},
		{
			key: "Blockquote",
			icon: <MessageSquareQuote size={20} />,
			onClick: () => editor?.chain().focus().toggleBlockquote().run(),
			disabled: false,
			active: editorState.isBlockquote,
		},
		{
			key: "HorizontalRule",
			icon: <Minus size={20} />,
			onClick: () => editor?.chain().focus().setHorizontalRule().run(),
			disabled: false,
			active: false,
		},
	];
	return (
		controls.map((control) => (
			<button
				key={control.key}
				onClick={(e) => {
					e.preventDefault();
					control.onClick();
				}}
				disabled={control.disabled}
				className={styles.menuBarButton({ active: control.active })}
			>
				{control.icon}
			</button>
		))
	);
}