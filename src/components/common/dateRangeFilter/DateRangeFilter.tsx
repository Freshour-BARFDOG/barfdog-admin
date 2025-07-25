import * as styles from './DateRangeFilter.css';
import { ChangeEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { OLDEST_DATE } from "@/constants/common";
import DatePicker from "@/components/common/datePicker/DatePicker";

const PRESETS = [
	{ label: '전체', days: null },
	{ label: '120일', days: 120 },
	{ label: '60일', days: 60 },
	{ label: '30일', days: 30 },
	{ label: '7일', days: 7 },
	{ label: '3일', days: 3 },
	{ label: '오늘', days: 0 },
];

interface DateRange {
	startDate: string | null; // 'yyyy-MM-dd'
	endDate: string | null;
}

type DateRangeFilterProps = {
	value: DateRange;
	onChangeRange: (range: DateRange) => void;
};

const toString = (date: Date | null): string | null =>
	date ? format(date, 'yyyy-MM-dd') : null;

export default function DateRangeFilter({
	value,
	onChangeRange,
}: DateRangeFilterProps) {
	const todayStr = format(new Date(), 'yyyy-MM-dd');
	const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

	const applyPreset = (days: number | null) => {
		const today = new Date();
		const oldestDate = new Date(OLDEST_DATE);
		let start: Date | null = null;
		let end: Date | null = today;

		if (days === null) {
			start = oldestDate;
		} else if (days === 0) {
			start = today;
			end = today;
		} else {
			start = new Date(today);
			start.setDate(today.getDate() - days);
		}

		setSelectedPreset(days);
		onChangeRange({
			startDate: toString(start),
			endDate: toString(end),
		});
	};

	const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedPreset(null); // 수동입력 시 preset 해제
		onChangeRange({
			startDate: e.target.value,
			endDate: value.endDate,
		});
	};

	const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedPreset(null);
		onChangeRange({
			startDate: value.startDate,
			endDate: e.target.value,
		});
	};

	useEffect(() => {
		// 외부 value가 preset과 일치하는지 계산
		if (!value.startDate || !value.endDate) {
			setSelectedPreset(null);
			return;
		}

		const match = PRESETS.find(({ days }) => {
			if (days === null) {
				return (
					value.startDate === format(OLDEST_DATE, 'yyyy-MM-dd') &&
					value.endDate === todayStr
				);
			} else {
				const expectedStart = new Date();
				expectedStart.setDate(expectedStart.getDate() - days);
				const expectedStartStr = format(expectedStart, 'yyyy-MM-dd');
				return (
					value.startDate === expectedStartStr &&
					value.endDate === todayStr
				);
			}
		});

		setSelectedPreset(match?.days ?? null);
	}, [value.startDate, value.endDate]);
	return (
		<div>
			<div className={styles.presetButtonBox}>
				{PRESETS.map(({ label, days }) => (
					<button
						key={label}
						onClick={() => applyPreset(days)}
						className={styles.presetButton({ active: selectedPreset === days })}
					>
						{label}
					</button>
				))}
			</div>
			<div className={styles.dateRageBox}>
				<DatePicker
					value={value.startDate ?? ''}
					max={value.endDate ?? ''}
					onChange={handleStartDateChange}
				/>
				~
				<DatePicker
					value={value.endDate ?? ''}
					min={value.startDate ?? ''}
					max={todayStr}
					onChange={handleEndDateChange}
				/>
			</div>
		</div>
	);
}