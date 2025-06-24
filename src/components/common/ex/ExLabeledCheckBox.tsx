'use client';
import { useState } from "react";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Text from "@/components/common/text/Text";

const ExLabeledCheckBox = () => {
	const [selectedGrade, setSelectedGrade] = useState<string[]>([]);

	const gradeCheckBoxGroup = [
		{ label: '브론즈', value: 'BRONZE' },
		{ label: '실버', value: 'SILVER' },
		{ label: '골드', value: 'GOLD' },
		{ label: '플래티넘', value: 'PLATINUM' },
		{ label: '다이아', value: 'DIA' },
		{ label: '더 바프', value: 'THE_BARF' },
	];
	return (
		<div>
			<Text type='title3'>LabeledCheckBox 예시</Text>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<div style={{ display: 'flex', gap: '8px' }}>
					{gradeCheckBoxGroup.map(grade => {
						const isSelected = selectedGrade.includes(grade.value);
						return (
							<LabeledCheckbox
								key={grade.value}
								value={grade.value}
								isChecked={isSelected}
								onToggle={() =>
									!isSelected
										? setSelectedGrade([...selectedGrade, grade.value])
										: setSelectedGrade(prev => prev.filter(v => v !== grade.value))
								}
								iconType='square'
								label={grade.label}
							/>
						)
					})}
				</div>
				<div style={{ display: 'flex', gap: '8px' }}>
					{gradeCheckBoxGroup.map(grade => {
						const isSelected = selectedGrade.includes(grade.value);
						return (
							<LabeledCheckbox
								key={grade.value}
								value={grade.value}
								isChecked={isSelected}
								onToggle={() =>
									!isSelected
										? setSelectedGrade([...selectedGrade, grade.value])
										: setSelectedGrade(prev => prev.filter(v => v !== grade.value))
								}
								iconType='circle'
								label={grade.label}
							/>
						)
					})}
				</div>
			</div>
		</div>
	);
};

export default ExLabeledCheckBox;