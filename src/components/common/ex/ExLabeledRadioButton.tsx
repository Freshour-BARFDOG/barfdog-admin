'use client';
import { useState } from "react";
import Text from "@/components/common/text/Text";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";

const ExLabeledRadioButton = () => {
	const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

	const statusGroup = [
		{ label: '전체', value: 'ALL' },
		{ label: '구독', value: 'SUBSCRIBING' },
		{ label: '비구독', value: 'UNSUBSCRIBING' },
	];
	return (
		<div>
			<Text type='title3'>LabeledRadioButton 예시</Text>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<div style={{ display: 'flex', gap: '8px' }}>
					{statusGroup.map(status => {
						const isSelected = selectedStatus === status.value;
						return (
							<LabeledRadioButton
								key={status.value}
								value={status.value}
								isChecked={isSelected}
								onToggle={() =>
									setSelectedStatus(status.value)
								}
								optionType='radio'
								label={status.label}
							/>
						)
					})}
				</div>
				<div style={{ display: 'flex', gap: '8px' }}>
					{statusGroup.map(status => {
						const isSelected = selectedStatus === status.value;
						return (
							<LabeledRadioButton
								key={status.value}
								value={status.value}
								isChecked={isSelected}
								onToggle={() =>
									setSelectedStatus(status.value)
								}
								optionType='selection'
								label={status.label}
							/>
						)
					})}
				</div>
			</div>
		</div>
	);
};

export default ExLabeledRadioButton;