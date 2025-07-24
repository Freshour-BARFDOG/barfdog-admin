'use client';
import * as styles from './MemberList.css';
import { useState } from "react";
import Button from "@/components/common/button/Button";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import LabeledCheckboxGroup from "@/components/common/labeledCheckBoxGroup/LabeledCheckBoxGroup";
import SearchFilterGroup from '@/components/common/searchFilterGroup/SearchFilterGroup';
import useSearchValues from "@/hooks/useSearchValues";
import Loader from "@/components/common/loader/Loader";
import MemberTable from "@/components/pages/member/table/MemberTable";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { MemberListSearchParams } from "@/types/member";
import { GradeType, SearchFilterItem } from "@/types/common";
import { useGetMemberList } from "@/api/member/queries/useGetMemberList";
import { INITIAL_SEARCH_VALUES, SEARCH_GRADE_LIST, SEARCH_STATUS } from "@/constants/member";
import { SEARCH_CATEGORY } from "@/constants/common";
import { useExcelDownloadMemberList } from "@/api/member/mutations/useExcelDownloadMemberList";
import { downloadBlobFile } from '@/utils/downloadBlobFile';
import { useToastStore } from "@/store/useToastStore";

const MemberList = () => {
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<MemberListSearchParams>(INITIAL_SEARCH_VALUES);

	const { data } = useGetMemberList(page,submittedValues ?? INITIAL_SEARCH_VALUES);
	const [selectedCategory, setSelectedCategory] = useState<'email' | 'name'>('email');

	const { mutate: excelDownload, isPending: isExcelDownloading } = useExcelDownloadMemberList();
	const { addToast } = useToastStore();

	const handleExcelDownload = () => {
		excelDownload(submittedValues, {
			onSuccess: (data) => {
				downloadBlobFile(data as Blob, '회원목록.xlsx');
			},
			onError: (err) => {
				addToast('엑셀 다운로드에 실패했습니다.\n관리자에게 문의해주세요.')
				console.log(err)
			}
		})
	}

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
			label: '회원 검색',
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
			label: '구독 여부',
			children: (
				<LabeledRadioButtonGroup
					options={SEARCH_STATUS}
					value={searchValues.subscribing}
					onChange={(value) => setSearchValues({ ...searchValues, subscribing: value })}
					optionType="radio"
				/>
			),
		},
		{
			label: '등급',
			children: (
				<LabeledCheckboxGroup
					options={SEARCH_GRADE_LIST.map((grade) => ({
						label: grade,
						value: grade as GradeType,
					}))}
					selectedValues={searchValues.gradeList}
					onChange={(newSelected) =>
						setSearchValues({ ...searchValues, gradeList: newSelected as GradeType[] })
					}
				/>
			),
		},
	]

	if(!data) return null
	return (
		<div className={styles.memberListContainer}>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<MemberTable
				data={data}
				firstRow={{
					key: 'id',
					header: '번호',
					width: '60px',
					render: (row, index) =>
						data?.page && getTableRowNumber({
							totalElements: data?.page.totalElements as number,
							currentPage: data?.page.number as number,
							pageSize: data?.page.size as number,
							index,
						}).toString(),
				}}
				page={page}
				onChangePage={onChangePage}
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
};

export default MemberList;