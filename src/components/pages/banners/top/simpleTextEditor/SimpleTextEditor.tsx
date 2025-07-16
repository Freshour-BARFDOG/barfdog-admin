import * as styles from './SimpleTextEditor.css';
import { useCallback, useEffect, useRef } from "react";
import { commonWrapper } from "@/styles/common.css";
import { inputBaseStyle, inputStyle, inputVariants } from "@/components/common/inputField/InputField.css";
import Button from "@/components/common/button/Button";

interface SimpleTextEditorProps {
	value: string;
	onChange: (html: string) => void;
}

export default function SimpleTextEditor({
	value,
	onChange,
}: SimpleTextEditorProps) {
	const editorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (editorRef.current && editorRef.current.innerHTML !== value) {
			editorRef.current.innerHTML = value || '';
		}
	}, []);

	const handleInput = useCallback(() => {
		if (editorRef.current) {
			let cleaned = editorRef.current.innerHTML.replace(/style=""/g, '');
			// <br>만 있을 경우 빈 문자열로 처리
			if (cleaned === '<br>' || cleaned === '<div><br></div>') {
				cleaned = '';
			}
			onChange(cleaned);
		}
	}, [onChange]);

	// 텍스트 스타일 적용
	const exec = (command: 'bold' | 'italic' | 'underline') => {
		document.execCommand(command);
		handleInput();
	};
	return (
		<div className={commonWrapper({ justify: 'start', align: 'center', gap: 4 })}>
			<div className={styles.textInput}>
				<div
					ref={editorRef}
					contentEditable
					suppressContentEditableWarning
					onInput={handleInput}
					className={`${inputBaseStyle} ${inputVariants.box} ${inputStyle}`}
				/>
			</div>
			<div className={commonWrapper({ justify: 'start', align: 'center', gap: 4 })}>
				<Button size='sm' variant='outline' type='assistive' onClick={() => exec('bold')}>B</Button>
				<Button size='sm' variant='outline' type='assistive' onClick={() => exec('italic')}>I</Button>
				<Button size='sm' variant='outline' type='assistive' onClick={() => exec('underline')}>U</Button>
			</div>
		</div>
	);
}