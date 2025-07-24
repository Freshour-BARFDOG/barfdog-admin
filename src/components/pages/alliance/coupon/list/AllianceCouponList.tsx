'use client';
import { commonWrapper, fullWidth } from "@/styles/common.css";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import AllianceCouponTable from "@/components/pages/alliance/coupon/list/table/AllianceCouponTable";
import AllianceCouponTab from "@/components/pages/alliance/coupon/list/tab/AllianceCouponTab";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import useSearchValues from "@/hooks/useSearchValues";
import { AllianceCouponListResponse, AllianceCouponListSearchParams, AllianceCouponSearchType, AllianceCouponTarget } from "@/types/alliance";
import {
	ALLIANCE_COUPON_SEARCH_TYPE_LIST,
	ALLIANCE_COUPON_TARGET_LIST,
	INITIAL_COUPON_SEARCH_VALUES
} from "@/constants/alliance";
import { SearchFilterItem } from "@/types/common";
import { useGetAllianceCouponList } from "@/api/alliance/queries/useGetAllianceCouponList";

export default function AllianceCouponList() {
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
		onChangeAndSubmit,
	} = useSearchValues<AllianceCouponListSearchParams>(INITIAL_COUPON_SEARCH_VALUES);

	const { data } = useGetAllianceCouponList(page,submittedValues ?? INITIAL_COUPON_SEARCH_VALUES);

	const filters: SearchFilterItem[] = [
		{
			label: (
				<TooltipInfo title='조회 기간'>
					좌측 조회기간은 우측 조회기간보다 과거시점이어야 합니다.
				</TooltipInfo>
			),
			children: (
				<DateRangeFilter
					value={{
						startDate: searchValues.from,
						endDate: searchValues.to,
					}}
					onChangeRange={(value) => {
						const { startDate, endDate } = value;
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
			label: '조건 검색',
			children: (
				<SearchFilterKeyword
					categoryOptions={ALLIANCE_COUPON_SEARCH_TYPE_LIST}
					selectedCategory={searchValues.searchType}
					keyword={searchValues.search}
					onChangeCategory={(category) => setSearchValues({ ...searchValues, searchType: category as AllianceCouponSearchType })}
					onChangeKeyword={(keyword) => {
						setSearchValues({...searchValues, search: keyword});
					}}
					onSubmit={onSubmit}
				/>
			),
		},
		{
			label: '사용처',
			children: (
				<LabeledRadioButtonGroup
					options={ALLIANCE_COUPON_TARGET_LIST}
					value={searchValues.couponTarget}
					onChange={(value) => setSearchValues({ ...searchValues, couponTarget: value as AllianceCouponTarget})}
					optionType="radio"
				/>
			),
		},
	]

	return (
		<div className={commonWrapper({ direction: 'col', gap: 20, align: 'start' })}>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<div className={fullWidth}>
				<AllianceCouponTab
					status={searchValues.status}
					onChangeStatus={(value) => onChangeAndSubmit('status', value)}
				/>
				<AllianceCouponTable
					data={data as AllianceCouponListResponse}
					page={page}
					onChangePage={onChangePage}
					status={searchValues.status}
					submittedValues={submittedValues}
				/>
			</div>
		</div>
	);
}