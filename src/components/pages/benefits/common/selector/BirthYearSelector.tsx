import * as styles from './Selector.css';
import { useEffect, useState } from 'react';
import SelectBox from "@/components/common/selectBox/SelectBox";

interface BirthYearSelectorProps {
	onChange: (range: { from?: string; to?: string }) => void;
}

const BIRTH_YEAR_LIST = Array.from({ length: 2010 - 1940 + 1 }, (_, i) =>
	String(1940 + i)
);

export default function BirthYearSelector({ onChange }: BirthYearSelectorProps) {
	const [from, setFrom] = useState<string | undefined>();
	const [to, setTo] = useState<string | undefined>();

	const fromIndex = from ? BIRTH_YEAR_LIST.indexOf(from) : -1;

	// 오른쪽 셀렉트박스에 보여줄 옵션
	const toOptions =
		fromIndex === -1 ? BIRTH_YEAR_LIST : BIRTH_YEAR_LIST.slice(fromIndex);

	const fromOptions = BIRTH_YEAR_LIST.map((year) => ({
		label: `${year}년`,
		value: year,
	}));

	const toSelectOptions = toOptions.map((year) => ({
		label: `${year}년`,
		value: year,
	}));

	useEffect(() => {
		onChange({ from, to });
	}, [from, to]);

	return (
		<div className={styles.selector}>
			<SelectBox
				value={from}
				onChange={(value) => setFrom(value)}
				options={fromOptions}
				placeholder="출생년도 시작"
			/>
			~
			<SelectBox
				value={to}
				onChange={(value) => setTo(value)}
				options={toSelectOptions}
				disabled={!from}
				placeholder="출생년도 종료"
			/>
		</div>
	);
}