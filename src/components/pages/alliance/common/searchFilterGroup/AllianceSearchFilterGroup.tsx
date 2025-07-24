import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import { SearchFilterItem } from "@/types/common";
import { AllianceListSearchParams } from "@/types/alliance";

interface AllianceSearchFilterGroupProps {
	type: 'member' | 'sales';
	searchValues: AllianceListSearchParams;
	setSearchValues:  (value: AllianceListSearchParams) => void;
	onSubmit: () => void;
	onReset: () => void;
}

export default function AllianceSearchFilterGroup({
	type,
	searchValues,
	setSearchValues,
	onSubmit,
	onReset,
}: AllianceSearchFilterGroupProps) {
	const filters: SearchFilterItem[] = [
		{
			label: (
				<TooltipInfo title='조회 기간'>
					{type === 'member'
						? '좌측 조회기간은 우측 조회기간보다 과거시점이어야 합니다.'
						: '결제일 기준 조회 기간입니다. 좌측 조회기간은 우측 조회기간보다 과거시점이어야 합니다.'
					}
				</TooltipInfo>
			),
			children: (
				<DateRangeFilter
					value={{
						startDate: searchValues.from,
						endDate: searchValues.to,
					}}
					onChangeRange={(range) => {
						const { startDate, endDate } = range;
						setSearchValues({
							...searchValues,
							from: startDate as string,
							to: endDate as string,
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