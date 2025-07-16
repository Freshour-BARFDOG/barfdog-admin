import { useEffect, useRef, useState } from "react";
import {
	dropdown,
	dropdownMenu,
	dropdownMenuItem,
	menuBarButton
} from "@/components/common/tiptapEditor/menuBar/MenuBar.css";
import { ChevronDown } from "lucide-react";
import { Editor } from "@tiptap/react";
import Text from "@/components/common/text/Text";

interface HeadingDropdownProps {
	editor: Editor;
}

export default function HeadingDropdown({
	editor,
}: HeadingDropdownProps) {
	const [selectedHeading, setSelectedHeading] = useState(1);
	const [headingOpen, setHeadingOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setHeadingOpen(false);
			}
		}
		if (headingOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [headingOpen]);

	return (
		<div className={dropdown} ref={dropdownRef}>
			<button
				className={`${menuBarButton({ active: editor?.isActive("heading", { level: selectedHeading }) })}`}
				onClick={() => setHeadingOpen((v) => !v)}
				type="button"
			>
				<Text type="headline4" color={editor?.isActive("heading", { level: selectedHeading }) ? 'gray0' : 'gray900'}>
					H{selectedHeading}&nbsp;
				</Text>
				<ChevronDown size={10} />
			</button>
			{headingOpen && (
				<div className={dropdownMenu}>
					{[1, 2, 3, 4, 5, 6].map((level) => (
						<button
							key={level}
							className={dropdownMenuItem({ active: editor?.isActive("heading", { level })})}
							onClick={() => {
								editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
								setHeadingOpen(false);
								setSelectedHeading(level);
							}}
							type="button"
						>
							{`H${level} Heading ${level}`}
						</button>
					))}
				</div>
			)}
		</div>
	);
}