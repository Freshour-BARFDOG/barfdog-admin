'use client';
import { useState } from "react";
import InputField from "@/components/common/inputField/InputField";
import Text from "@/components/common/text/Text";

const ExInput = () => {
	const [value, setValue] = useState('');
	return (
		<div>
			<Text type='title3'>InputField 예시</Text>
			<InputField
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				variants='box'
				placeholder='반려견 이름을 입력해주세요.'
				label='반려견 이름'
				isRequired
				confirmButtonText='중복확인'
				confirmButton
				confirmButtonVariant='solid'
				confirmButtonDisabled={!value}
				onSubmit={() => console.log('')}
			/>
			<InputField
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				variants='box'
				placeholder='반려견 이름을 입력해주세요.'
				isRequired
				searchButton
			/>
			<InputField
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				variants='box'
				placeholder='반려견 이름을 입력해주세요.'
				isRequired
				masking
				maskingButton
			/>
			<InputField
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				variants='box'
				placeholder='반려견 이름을 입력해주세요.'
				isRequired
				clearButton
				onReset={() => setValue('')}
			/>
		</div>
	);
};

export default ExInput;