import { format } from "date-fns";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import { SearchFilterItem } from "@/types/common";
import { AllianceListSearchParams } from "@/types/alliance";

interface AllianceSearchFilterGroupProps {
	searchValues: AllianceListSearchParams;
	setSearchValues:  (value: AllianceListSearchParams) => void;
	onSubmit: () => void;
	onReset: () => void;
}

export default function AllianceSearchFilterGroup({
	searchValues,
	setSearchValues,
	onSubmit,
	onReset,
}: AllianceSearchFilterGroupProps) {
	const filters: SearchFilterItem[] = [
		{
			label: '조회 기간',
			children: (
				<DateRangeFilter
					initialRange={{ startDate: new Date(searchValues.from), endDate: new Date(searchValues.to) }}
					onChangeRange={(value) => {
						const { startDate, endDate } = value;
						setSearchValues({
							...searchValues,
							from: format(startDate as Date, 'yyyy-MM-dd'),
							to: format(endDate as Date, 'yyyy-MM-dd'),
						})
					}}
				/>
			),
			align: 'start'
		},
		{
			label: '제휴사',
			children: (
				<LabeledRadioButtonGroup
					options={[{ label: '콕뱅크', value: 'cb' }]}
					value='cb'
					onChange={() => {}}
					optionType="radio"
				/>
			),
		}
	]
	return (
		<SearchFilterGroup
			items={filters}
			onSubmit={onSubmit}
			onReset={onReset}
		/>
	);
}