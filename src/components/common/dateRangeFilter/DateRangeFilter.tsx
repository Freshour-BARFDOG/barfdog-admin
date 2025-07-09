import * as styles from './DateRangeFilter.css';
import { ChangeEvent, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import DatePicker from "@/components/common/datePicker/DatePicker";
import { OLDEST_DATE } from "@/constants/common";

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
	startDate: Date | null;
	endDate: Date | null;
}

type DateRangeFilterProps = {
	onChangeRange: (range: DateRange) => void;
};

// 날짜 객체 → yyyy-MM-dd 문자열
const formatDate = (date: Date | null): string =>
	date ? format(date, 'yyyy-MM-dd') : '';

// yyyy-MM-dd 문자열 → Date 객체
const parseDate = (str: string): Date => parseISO(str);

export default function DateRangeFilter({ onChangeRange }: DateRangeFilterProps) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date>(new Date());
	const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

	const applyPreset = (days: number | null) => {
		const today = new Date();
		let startDate: Date | null = null;
		let endDate: Date | null = today;

		if (days === null) {
			startDate = OLDEST_DATE;
		} else if (days === 0) {
			startDate = today;
			endDate = today;
		} else {
			startDate = new Date(today);
			startDate.setDate(today.getDate() - days);
		}

		setStartDate(startDate);
		setEndDate(endDate);
		setSelectedPreset(days);
		onChangeRange({ startDate, endDate });
	};

	const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newStart = e.target.value ? parseDate(e.target.value) : null;
		setStartDate(newStart);
		setSelectedPreset(null); // 수동 조작 시 preset 해제
		onChangeRange({ startDate: newStart, endDate });
	};

	const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newEnd = e.target.value ? parseDate(e.target.value) : null;
		if (newEnd) setEndDate(newEnd);
		setSelectedPreset(null); // 수동 조작 시 preset 해제
		onChangeRange({ startDate, endDate: newEnd });
	};

	useEffect(() => {
		applyPreset(null); // 최초 로딩 시 전체 범위 적용
	}, []);

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
					value={formatDate(startDate)}
					max={formatDate(endDate)}
					onChange={handleStartDateChange}
				/>
				~
				<DatePicker
					value={formatDate(endDate)}
					min={formatDate(startDate)}
					max={formatDate(new Date())}
					onChange={handleEndDateChange}
				/>
			</div>
		</div>
	);
}