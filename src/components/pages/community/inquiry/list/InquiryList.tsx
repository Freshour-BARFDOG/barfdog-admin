'use client';
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { themeVars } from "@/styles/theme.css";
import { commonWrapper } from "@/styles/common.css";
import { useQueryClient } from "@tanstack/react-query";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import useItemSelection from "@/hooks/useItemSelection";
import useSearchValues from "@/hooks/useSearchValues";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import { INQUIRY_LIST_INITIAL_SEARCH_VALUES, INQUIRY_STATUS, INQUIRY_STATUS_LIST } from "@/constants/community";
import { SEARCH_CATEGORY } from "@/constants/common";
import { AnswerData, InquiryListData, InquiryListSearchParams, InquiryStatus } from "@/types/community";
import { SearchFilterItem, TableColumn } from "@/types/common";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { useGetInquiryList } from "@/api/community/queries/useGetInquiryList";
import { useDeleteInquiry } from "@/api/community/mutations/useDeleteInquiry";

type InquiryTableRow =
  | ({ type: "inquiry" } & InquiryListData)
  | ({ type: "answer"; parentId: number } & AnswerData);

function flattenInquiryList(list: InquiryListData[]): InquiryTableRow[] {
  const result: InquiryTableRow[] = [];
  list.forEach((inquiry) => {
    result.push({ ...inquiry, type: "inquiry" });
    inquiry?.answerList?.forEach((answer) => {
      result.push({ ...answer, type: "answer", parentId: inquiry.id });
    });
  });
  return result;
}

export default function InquiryList() {
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<InquiryListSearchParams>(INQUIRY_LIST_INITIAL_SEARCH_VALUES);
	const { data } = useGetInquiryList(page,submittedValues ?? INQUIRY_LIST_INITIAL_SEARCH_VALUES);
	const [selectedType, setSelectedType] = useState<'title' | 'email' | 'name'>('title');
	const flatData = flattenInquiryList(data?.inquiryList ?? []);

	const {
		selectedIds: deleteSelectedIds,
		toggleSelect,
		selectAll,
		isSelected,
		allSelected,
	} = useItemSelection(flatData, (data) => data.id, [] );
	const { mutateAsync } = useDeleteInquiry();

	const handleDeleteSelectedIds = async () => {
		if (deleteSelectedIds.length === 0) return;
		const confirmed = window.confirm(`선택하신 ${deleteSelectedIds.length}개의 항목을 삭제하시겠습니까?`);
		if (!confirmed) return;

		try {
			await Promise.all(
				deleteSelectedIds.map(id =>
					mutateAsync({ id: id as number })
						.catch(error => {
							console.error(`ID ${id} 삭제 실패`, error);
							throw new Error(`ID ${id} 삭제 실패`);
						})
				)
			);
			await queryClient.invalidateQueries({
				queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_INQUIRY_LIST, page],
			});
			addToast(`선택하신 ${deleteSelectedIds.length}개의 항목이 삭제되었습니다!`);
		} catch (error) {
			console.error(error);
			addToast(`삭제에 실패한 항목이 있습니다.`);
		} finally {
			selectAll(false);
		}
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
					categoryOptions={[{ label: '제목', value: 'title' }, ...SEARCH_CATEGORY]}
					selectedCategory={selectedType}
					keyword={searchValues.value}
					onChangeCategory={(category) => setSelectedType(category as 'title' | 'email' | 'name')}
					onChangeKeyword={(keyword) => {
						setSearchValues({...searchValues, type: selectedType, value: keyword});
					}}
					onSubmit={onSubmit}
				/>
			),
		},
		{
			label: '응답 상태',
			children: (
				<LabeledRadioButtonGroup
					options={INQUIRY_STATUS_LIST}
					value={searchValues.answerStatus}
					onChange={(newSelected) =>
						setSearchValues({ ...searchValues, answerStatus: newSelected as InquiryStatus })
					}
				/>
			),
		},
	]

	const columns: TableColumn<InquiryListData>[] = [
		{
			key: 'id',
			header: (
				<LabeledCheckbox
					value={allSelected}
					isChecked={allSelected}
					onToggle={(value) => {
						selectAll(!value)
					}}
				/>
			),
			width: '60px',
			render: (row) => (
				<LabeledCheckbox
					value={row.id}
					isChecked={isSelected(row.id)}
					onToggle={() => toggleSelect(row.id)}
				/>
			),
		},
		{ key: 'seq', header: '번호', width: '60px',
			render: (row: InquiryListData, index: number) =>
				row.type === "inquiry" 
					? getTableRowNumber({
						totalElements: data?.page.totalElements as number,
						currentPage: data?.page.number as number,
						pageSize: data?.page.size as number,
						index,
					}).toString() 
					: '',
		},
		{
			key: 'id',
			header: '상세보기',
			width: 80,
			render: (row) => (
				row.type === "inquiry" &&
				<Link href={`/community/inquiry/${row.id}`} target='_blank'>
					<Text type='body3' color='red'>상세보기</Text>
				</Link>
			),
		},
		{
			key: 'title',
			header: '제목',
			render: (row: InquiryListData) => (
				<div className={commonWrapper({ gap: 12, justify: 'start' })}>
					{row.type === "answer" && 
						<Chips variant='solid' size='sm' borderRadius='lg' color='red'>
							답변
						</Chips>
					}
					{row.title}
				</div>
			)
		},
		{ 
			key: 'name', 
			header: '작성자', 
			render: (row: InquiryListData) => 
				row.type === "inquiry" 
					? row.name || '-' 
					: <Text type="body3" color="gray500">관리자</Text>
			, 
		},
		{ key: 'email', header: '이메일', render: (row: InquiryListData) => row.type === "inquiry" ? row.email || '-': '', },
		{
			key: 'answerStatus',
			header: '답변 상태',
			width: 100,
			render: (row: InquiryListData) => (
				row.type === "inquiry" && 
				<div className={commonWrapper({ direction: 'col', gap: 4 })}>
					{row.answerStatus === 'MULTIPLE_ANSWERED'
						? (
							<>
								<Chips variant='solid' size='sm' borderRadius='lg' color='red'>
									{INQUIRY_STATUS.ANSWERED}
								</Chips>
								<Chips variant='outlined' size='sm' borderRadius='lg' color='red'>
									{INQUIRY_STATUS.MULTIPLE_ANSWERED}
								</Chips>
							</>
						) : (
							<Chips variant={row.answerStatus === 'UNANSWERED' ? 'outlined' : 'solid'} size='sm' borderRadius='lg' color='red'>
								{INQUIRY_STATUS[row.answerStatus]}
							</Chips>
						)
					}
				</div>
			)
		},
		{ key: 'createdDate', header: '작성 일시', render: (row: InquiryListData) => format(new Date(row.createdDate), 'yyyy-MM-dd HH:mm:ss') },
	] as TableColumn<InquiryListData>[];

	return (
		<ListLayout>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={flatData as InquiryListData[]}
				columns={columns}
				page={page}
				onPageChange={onChangePage}
				totalPages={data?.page?.totalPages ?? 0}
				title='문의 목록'
				emptyText='문의 목록 데이터가 없습니다.'
				getRowStyle={(row: InquiryListData) =>
					row.type === "answer"
						? { backgroundColor: themeVars.colors.gray.gray50 }
						: {}
				}
				action={(
					<Button onClick={handleDeleteSelectedIds} disabled={deleteSelectedIds.length < 1} size='sm' variant='outline' type='assistive'>
						선택 삭제
					</Button>
				)}
			/>
		</ListLayout>
	);
}