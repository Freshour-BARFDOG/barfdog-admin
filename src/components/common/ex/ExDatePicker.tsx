'use client';
import { useState } from "react";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import Text from "@/components/common/text/Text";
import DateTimePicker from "@/components/common/dateTimePicker/DateTimePicker";
import { OLDEST_DATE, TODAY } from "@/constants/common";

const ExDatePicker = () => {
	const [range, setRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
		startDate: null,
		endDate: null
	});

	const handleRangeChange = (newRange: { startDate: Date | null; endDate: Date | null }) => {
		setRange(newRange);
	};
	const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<div>
				<Text type='title3'>DatePicker 예시</Text>
				<DateRangeFilter
					value={{
						startDate: OLDEST_DATE,
						endDate: TODAY,
					}}
					onChangeRange={} />
			</div>
			<div>
				<DateTimePicker
					value={selectedDateTime}
					onChange={(dt) => {
						setSelectedDateTime(dt);
					}}
					max={new Date()}
				/>
			</div>
		</div>
	);
};

export default ExDatePicker;