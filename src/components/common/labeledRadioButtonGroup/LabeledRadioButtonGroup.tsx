import { commonWrapper } from "@/styles/common.css";
import { SelectOption } from "@/types/common";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";


interface LabeledRadioButtonGroupProps<T extends string = string> {
	options: SelectOption<T>[];
	value: T;
	onChange: (value: T) => void;
	optionType?: "radio" | "selection";
	iconSize?: number;
	className?: string;
}

export default function LabeledRadioButtonGroup<T extends string = string>({
	options,
	value,
	onChange,
	optionType = "radio",
	iconSize = 24,
	className = '',
}: LabeledRadioButtonGroupProps) {
	return (
		<div className={`${className} ${commonWrapper({
			direction: 'row',
			align: 'center',
			justify: 'start',
			gap: 8
		})}`}>
			{options.map((option) => (
				<LabeledRadioButton<T>
					key={String(option.value)}
					value={option.value as T}
					label={option.label}
					isChecked={option.value === value}
					onToggle={onChange}
					iconSize={iconSize}
					optionType={optionType}
				/>
			))}
		</div>
	)
}
