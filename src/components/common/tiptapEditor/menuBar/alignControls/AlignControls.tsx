import * as styles from "@/components/common/tiptapEditor/menuBar/MenuBar.css";
import {
	AlignCenter, AlignJustify,
	AlignLeft, AlignRight,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { EditorState } from "@/components/common/tiptapEditor/menuBar/MenuBar";

interface TextControlsProps {
	editor: Editor;
	editorState: EditorState;
}

export default function AlignControls({ editor, editorState }: TextControlsProps) {
	const controls = [
		{
			key: "AlignLeft",
			icon: <AlignLeft size={20} />,
			onClick: () => editor?.chain().focus().setTextAlign('left').run(),
			disabled: false,
			active: editorState.isAlignLeft,
		},
		{
			key: "AlignCenter",
			icon: <AlignCenter size={20} />,
			onClick: () => editor?.chain().focus().setTextAlign('center').run(),
			disabled: false,
			active: editorState.isAlignCenter,
		},
		{
			key: "AlignRight",
			icon: <AlignRight size={20} />,
			onClick: () => editor?.chain().focus().setTextAlign('right').run(),
			disabled: false,
			active: editorState.isAlignRight,
		},
		{
			key: "AlignJustify",
			icon: <AlignJustify size={20} />,
			onClick: () => editor?.chain().focus().setTextAlign('justify').run(),
			disabled: false,
			active: editorState.isAlignJustify,
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