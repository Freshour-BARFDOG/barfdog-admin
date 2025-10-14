import * as styles from "@/components/common/tiptapEditor/menuBar/MenuBar.css";
import {
	Bold,
	Braces,
	Code,
	Italic,
	Link,
	List,
	ListOrdered,
	MessageSquareQuote,
	Minus,
	Pilcrow,
	Strikethrough
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { EditorState } from "@/components/common/tiptapEditor/menuBar/MenuBar";
import { useCallback } from "react";

interface TextControlsProps {
	editor: Editor;
	editorState: EditorState;
}

export default function TextControls({ editor, editorState }: TextControlsProps) {

const toggleLink = useCallback(() => {
  if (!editor) return;

  // 현재 selection이 링크인지 확인
  if (editor.isActive('link')) {
    // 링크가 이미 걸려 있으면 해제
    editor.chain().focus().unsetLink().run();
  } else {
    // 링크가 없으면 새로 추가
    const url = window.prompt('URL');
    if (!url) return;

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }
}, [editor]);

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
			key: "Link",
			icon: <Link size={20} />,
			onClick: toggleLink,
			disabled: false,
			active: editorState.isLink,
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