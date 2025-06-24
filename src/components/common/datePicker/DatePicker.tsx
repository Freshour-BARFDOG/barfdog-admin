import { ChangeEvent } from 'react';
import * as styles from './DatePicker.css';

interface DatePickerProps {
	type?: 'date' | 'datetime-local';
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	min?: string;
	max?: string;
	disabled?: boolean;
}

export default function DatePicker({
	type = 'date',
	value,
	onChange,
	max,
	min,
	disabled = false,
}: DatePickerProps) {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			max={max}
			min={min}
			disabled={disabled}
			className={styles.dateRageInput}
		/>
	);
}