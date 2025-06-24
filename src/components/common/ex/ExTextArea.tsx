'use client';
import { useState } from "react";
import Text from "@/components/common/text/Text";
import Textarea from "@/components/common/textarea/Textarea";

const ExTextArea = () => {
	const [value, setValue] = useState<string>('');
	return (
		<div style={{ width: '50%' }}>
			<Text type='title3'>Textarea 예시</Text>
			<Textarea
				id='content'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				maxLength={1000}
				placeholder='콘텐츠를 입력해주세요.'
			/>
		</div>
	);
};

export default ExTextArea;