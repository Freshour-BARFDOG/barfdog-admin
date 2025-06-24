import { format, parseISO } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "@/components/common/datePicker/DatePicker";

interface DateTimePickerProps {
	value: Date | null;
	onChange?: (value: Date | null) => void;
	min?: Date;
	max?: Date;
	disabled?: boolean;
}
// format: Date → yyyy-MM-ddTHH:mm
const formatDateTime = (date: Date | null) =>
	date ? format(date, "yyyy-MM-dd'T'HH:mm") : '';

// parse: string → Date
const parseDateTime = (value: string): Date => parseISO(value);

export default function DateTimePicker({ 
	value = null, 
	onChange, 
	max, 
	min, 
	disabled = false,
}: DateTimePickerProps) {
	const [localValue, setLocalValue] = useState<string>('');

	useEffect(() => {
		setLocalValue(formatDateTime(value));
	}, [value]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const str = e.target.value;
		setLocalValue(str);
		onChange?.(str ? parseDateTime(str) : null);
	};
	return (
		<DatePicker
			type="datetime-local"
			value={localValue}
			onChange={handleChange}
			min={min ? formatDateTime(min) : undefined}
			max={max ? formatDateTime(max) : undefined}
			disabled={disabled}
		/>
	);
}