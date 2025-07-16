import { useState } from "react";
import { menuBarButton } from "@/components/common/tiptapEditor/menuBar/MenuBar.css";
import { themeVars } from "@/styles/theme.css";
import { Baseline, PaintBucket } from "lucide-react";
import { Editor } from "@tiptap/react";

interface ColorControlsProps {
	editor: Editor;
}

export default function ColorControls({ editor }: ColorControlsProps) {
	const [fontColor, setFontColor] = useState("#000000");
	return (
		<>
			<label htmlFor="backgroundColor" className={menuBarButton({ active: false })}>
				<input
					id="backgroundColor"
					type="color"
					value={themeVars.colors.gray.gray900}
					onChange={(e) => {
						const val = e.currentTarget.value;
						editor.chain().focus().setBackgroundColor(val).run();
					}}
					style={{ display: "none" }}
				/>
				<PaintBucket size={20} />
			</label>

			{/* 폰트 색상 */}
			<label htmlFor="color" className={menuBarButton({ active: false })}>
				<input
					id="color"
					type="color"
					value={fontColor}
					onChange={(e) => {
						const val = e.currentTarget.value;
						setFontColor(val);
						editor.chain().focus().setColor(val).run();
					}}
					style={{ display: "none" }}
				/>
				<Baseline color={fontColor} size={20} />
			</label>
		</>
	);
}