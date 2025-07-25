'use client';
import { useState } from "react";
import { format } from "date-fns";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import LabeledCheckboxGroup from "@/components/common/labeledCheckBoxGroup/LabeledCheckBoxGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import Loader from "@/components/common/loader/Loader";
import useSearchValues from "@/hooks/useSearchValues";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { downloadBlobFile } from "@/utils/downloadBlobFile";
import { useToastStore } from "@/store/useToastStore";
import { REWARD_LIST_INITIAL_SEARCH_VALUES, REWARD_STATUS, REWARD_TYPE, REWARD_TYPE_LIST } from "@/constants/benefits/rewards";
import { SEARCH_CATEGORY } from "@/constants/common";
import { RewardListData, RewardListSearchParams, RewardStatus, RewardType } from "@/types/benefits/rewards";
import { SearchFilterItem, TableColumn } from "@/types/common";
import { useGetRewardList } from "@/api/rewards/queries/useGetRewardList";
import { useExcelDownloadRewardList } from "@/api/rewards/mutations/useExcelDownloadRewardList";

export default function RewardList() {
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<RewardListSearchParams>(REWARD_LIST_INITIAL_SEARCH_VALUES);
	const [selectedCategory, setSelectedCategory] = useState<'email' | 'name'>('email');

	const { data } = useGetRewardList(page,submittedValues ?? REWARD_LIST_INITIAL_SEARCH_VALUES);

	const { mutate: excelDownload, isPending: isExcelDownloading } = useExcelDownloadRewardList();
	const { addToast } = useToastStore();

	const handleExcelDownload = () => {
		excelDownload(submittedValues, {
			onSuccess: (data) => {
				downloadBlobFile(data as Blob, '적립금 목록.xlsx');
			},
			onError: (err) => {
				addToast('엑셀 다운로드에 실패했습니다.\n관리자에게 문의해주세요.')
				console.log(err)
			}
		})
	}

	const filters: SearchFilterItem[] = [
		{
			label: '조회 기간',
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
					categoryOptions={SEARCH_CATEGORY}
					selectedCategory={selectedCategory}
					keyword={searchValues[selectedCategory]}
					onChangeCategory={(category) => setSelectedCategory(category as 'email' | 'name')}
					onChangeKeyword={(keyword) => {
						setSearchValues({...searchValues, [selectedCategory]: keyword});
					}}
					onSubmit={onSubmit}
				/>
			),
		},
		{
			label: '적립금 타입',
			children: (
				<LabeledCheckboxGroup
					options={REWARD_TYPE_LIST}
					selectedValues={searchValues.rewardTypeList}
					onChange={(newSelected) =>
						setSearchValues({ ...searchValues, rewardTypeList: newSelected as RewardType[] })
					}
				/>
			),
		},
	]

	const columns: TableColumn<RewardListData>[] = [
		{ key: 'seq', header: '번호', width: '60px',
			render: (row: RewardListData, index: number) =>
				getTableRowNumber({
					totalElements: data?.page.totalElements as number,
					currentPage: data?.page.number as number,
					pageSize: data?.page.size as number,
					index,
				}).toString(),
		},
		{ key: 'createdDate', header: '적립 일자', render: (row: RewardListData) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
		{ key: 'name', header: '적립금 명칭' },
		{ key: 'rewardType', header: '적립급 타입', render: (row: RewardListData) => REWARD_TYPE[row.rewardType as RewardType] },
		{ key: 'amount', header: '금액', render: (row: RewardListData) => `${REWARD_STATUS[row.rewardStatus as RewardStatus]}${row.amount.toLocaleString()}원` },
		{ key: 'memberName', header: '적립금 수령자' },
		{ key: 'email', header: '수령자 아이디' },
		{ key: 'issuerName', header: '적립금 발급자', render: (row: RewardListData) => row.issuerName || '-' },
		{ key: 'issuerEmail', header: '발급자 아이디', render: (row: RewardListData) => row.issuerEmail || '-' },
	] as TableColumn<RewardListData>[];


	if(!data) return null;
	return (
		<div>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={data?.rewardList as RewardListData[]}
				columns={columns}
				page={page}
				onPageChange={onChangePage}
				totalPages={data?.page?.totalPages ?? 0}
				title='적립금 목록'
				emptyText='적립금 목록 데이터가 없습니다.'
				action={(
					<Button
						onClick={handleExcelDownload}
						disabled={isExcelDownloading}
						variant='outline'
						type='assistive'
						size='sm'
					>
						{isExcelDownloading ? <Loader size={24} /> : '엑셀 다운로드'}
					</Button>
				)}
			/>
		</div>
	);
}