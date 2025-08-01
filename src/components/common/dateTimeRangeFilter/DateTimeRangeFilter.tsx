import * as styles from './DateTimeRangeFilter.css';
import { dateRageInput } from "@/components/common/datePicker/DatePicker.css";
import { useEffect, useState, ChangeEvent } from 'react';
import { format, parse, isValid, startOfToday, subDays, isSameDay } from 'date-fns';

interface DateTimeRange {
	startDateTime: string | null; // 'yyyy-MM-dd-HH-mm' (서버 전송용)
	endDateTime: string | null;
}

type DateTimeFormatType = "yyyy-MM-dd'T'HH:mm" | "yyyy-MM-dd-HH-mm"; // UI 표시 포맷

type DateTimeRangeFilterProps = {
	value: DateTimeRange;
	onChangeRange: (range: DateTimeRange) => void;
	formatType: DateTimeFormatType;
};

const SERVER_FORMAT = "yyyy-MM-dd-HH-mm";

const PRESETS = [
	{ label: "오늘", days: 0 },
	{ label: "1주일", days: 7 },
	{ label: "1개월", days: 30 },
	{ label: "3개월", days: 90 },
	{ label: "6개월", days: 180 },
	{ label: "1년", days: 365 },
	{ label: "전체", days: null },
];

const OLDEST_DATE = new Date(2022, 0, 1);

// 서버포맷 → Date
const parseServerDateTime = (str: string | null): Date | null => {
	if (!str) return null;
	const parsed = parse(str, SERVER_FORMAT, new Date());
	return isValid(parsed) ? parsed : null;
};

// Date → 서버포맷
const formatServerDateTime = (date: Date): string => format(date, SERVER_FORMAT);

// Date → UI 포맷
const formatDateTime = (date: Date, formatType: "yyyy-MM-dd'T'HH:mm"): string =>
	format(date, formatType);

export default function DateTimeRangeFilter({
	value,
	onChangeRange,
	formatType,
}: DateTimeRangeFilterProps) {
	const [selectedPreset, setSelectedPreset] = useState<number | "none">(0);
	const [localStart, setLocalStart] = useState("");
	const [localEnd, setLocalEnd] = useState("");

	// 서버 값 → UI 초기값 설정
	useEffect(() => {
		const start = parseServerDateTime(value.startDateTime);
		const end = parseServerDateTime(value.endDateTime);

		setLocalStart(start ? formatDateTime(start, "yyyy-MM-dd'T'HH:mm") : "");
		setLocalEnd(end ? formatDateTime(end, "yyyy-MM-dd'T'HH:mm") : "");

		// preset 자동 활성화 판단
		if (!start || !end) {
			setSelectedPreset("none");
			return;
		}

		const match = PRESETS.find(({ days }) => {
			if (!start || !end) return false;
			if (days === null) {
				return isSameDay(start, OLDEST_DATE) && isSameDay(end, new Date());
			}

			const expectedStart = days === 0 ? startOfToday() : subDays(new Date(), days);
			return isSameDay(start, expectedStart) && isSameDay(end, new Date());
		});

		setSelectedPreset(match?.days ?? "none");

	}, [value.startDateTime, value.endDateTime]);

	// preset 버튼 클릭 시
	const applyPreset = (days: number | null) => {
		const now = new Date();
		const end = now;
		let start: Date;

		if (days === null) start = OLDEST_DATE;
		else if (days === 0) start = startOfToday();
		else start = subDays(now, days);

		setSelectedPreset(days as number | 'none');
		onChangeRange({
			startDateTime: formatServerDateTime(start),
			endDateTime: formatServerDateTime(end),
		});
	};

	const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
		const str = e.target.value;
		setLocalStart(str);
		setSelectedPreset("none");

		onChangeRange({
			startDateTime: format(new Date(str), formatType),
			endDateTime: value.endDateTime,
		});
	};

	const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
		const str = e.target.value;
		setLocalEnd(str);
		setSelectedPreset("none");

		onChangeRange({
			startDateTime: value.startDateTime,
			endDateTime: format(new Date(str), formatType),
		});
	};

	return (
		<div>
			<div className={styles.presetButtonBox}>
				{PRESETS.map(({ label, days }) => (
					<button
						key={label}
						type="button"
						onClick={() => applyPreset(days)}
						className={styles.presetButton({ active: selectedPreset === days })}
					>
						{label}
					</button>
				))}
			</div>

			<div className={styles.dateRageBox}>
				<input
					type="datetime-local"
					value={localStart}
					onChange={handleStartChange}
					min={formatDateTime(OLDEST_DATE, "yyyy-MM-dd'T'HH:mm")}
					max={localEnd || formatDateTime(new Date(), "yyyy-MM-dd'T'HH:mm")}
					className={dateRageInput}
				/>
				{" ~ "}
				<input
					type="datetime-local"
					value={localEnd}
					onChange={handleEndChange}
					min={localStart || formatDateTime(OLDEST_DATE, "yyyy-MM-dd'T'HH:mm")}
					max={formatDateTime(new Date(), "yyyy-MM-dd'T'HH:mm")}
					className={dateRageInput}
				/>
			</div>
		</div>
	);
}