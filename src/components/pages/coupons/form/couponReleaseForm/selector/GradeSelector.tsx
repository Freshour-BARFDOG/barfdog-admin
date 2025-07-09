import * as styles from './Selector.css';
import { useEffect, useState } from "react";
import SelectBox from "@/components/common/selectBox/SelectBox";
import { SEARCH_GRADE_LIST } from "@/constants/member";
import { GradeType } from "@/types/member";

interface GradeSelectorProps {
	onChange: (range: GradeType[]) => void;
}

export default function GradeSelector ({ onChange }: GradeSelectorProps) {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');

	const fromIndex = SEARCH_GRADE_LIST.indexOf(from);
	const toIndex = SEARCH_GRADE_LIST.indexOf(to);

	// 오른쪽 셀렉트박스에 보여줄 옵션
	const toOptions =
		fromIndex === -1 ? SEARCH_GRADE_LIST : SEARCH_GRADE_LIST.slice(fromIndex);

	// 최종 결과: from부터 to까지 등급 리스트
	const selectedRange =
		fromIndex > -1 && toIndex > -1 && toIndex >= fromIndex
			? SEARCH_GRADE_LIST.slice(fromIndex, toIndex + 1)
			: [];

	const fromList = SEARCH_GRADE_LIST.map(grade => ({ label: grade, value: grade }));
	const toList = toOptions.map(grade => ({ label: grade, value: grade }));

	useEffect(() => {
		if (selectedRange.length > 0) {
			onChange(selectedRange);
		} else {
			onChange([]);
		}
	}, [from, to]);

	return (
		<div className={styles.selector}>
			<SelectBox
				value={from}
				onChange={(value) => setFrom(value)}
				options={fromList}
			/>
			~
			<SelectBox
				value={to}
				disabled={!from}
				onChange={(value) => setTo(value)}
				options={toList}
			/>
		</div>
	);
};