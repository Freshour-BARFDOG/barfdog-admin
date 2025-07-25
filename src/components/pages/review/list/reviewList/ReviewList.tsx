'use client';
import Link from "next/link";
import { commonWrapper, ellipsis } from "@/styles/common.css";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Text from "@/components/common/text/Text";
import Tooltip from "@/components/common/tooltip/Tooltip";
import useItemSelection from "@/hooks/useItemSelection";
import useSearchValues from "@/hooks/useSearchValues";
import useReviewAction from "@/hooks/useReviewAction";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { queryKeys } from "@/constants/queryKeys";
import {
	REVIEW_LIST_INITIAL_SEARCH_VALUES,
	REVIEW_STATUS,
	REVIEW_STATUS_LIST,
} from "@/constants/review";
import { SearchFilterItem, TableColumn } from "@/types/common";
import { ReviewListData, ReviewListSearchParams, ReviewStatus } from "@/types/review";
import { useGetReviewList } from "@/api/review/queries/useGetReviewList";

export default function ReviewList() {
	const queryClient = useQueryClient();

	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<ReviewListSearchParams>(REVIEW_LIST_INITIAL_SEARCH_VALUES);

	const { data } = useGetReviewList(page,submittedValues ?? REVIEW_LIST_INITIAL_SEARCH_VALUES);

	// 선택 가능한 항목만 필터링 후 useItemSelection에 전달 (RETURN 상태 제외)
	const {
		selectedIds,
		toggleSelect,
		selectAll,
		isSelected,
		allSelected,
	} = useItemSelection(data?.reviewList.filter(review => review.status !== 'RETURN') ?? [], (data) => data.id, [] );

	// 현재 선택된 리뷰 목록
	const selectedReviews = data?.reviewList.filter((r) => selectedIds.includes(r.id)) ?? [];

	// 전체 선택된 항목이 모두 요청 상태(REQUEST)인지 확인
	const allSelectedAreRequest = selectedReviews.length > 0 && selectedReviews.every(r => r.status === 'REQUEST');
	// 전체 선택된 항목이 모두 승인 상태(APPROVAL)인지 확인
	const allSelectedAreApproval = selectedReviews.length > 0 && selectedReviews.every(r => r.status === 'APPROVAL' || r.status === 'ADMIN');

	// 리뷰 상태 업데이트 핸들러
	const { handleAction } = useReviewAction({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, page, submittedValues],
			});
			selectAll(false);
		},
	});

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
			label: '처리 상태',
			children: (
				<LabeledRadioButtonGroup
					options={REVIEW_STATUS_LIST}
					value={searchValues.status}
					onChange={(value) =>
						setSearchValues({ ...searchValues, status: value as ReviewStatus })
					}
				/>
			),
		},
	]

	const columns: TableColumn<ReviewListData>[] = [
		{
			key: 'checked-id',
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
					disabled={row.status === 'RETURN'}
				/>
			),
		},
		{ key: 'seq', header: '번호', width: '60px',
			render: (row, index) =>
				getTableRowNumber({
					totalElements: data?.page.totalElements as number,
					currentPage: data?.page.number as number,
					pageSize: data?.page.size as number,
					index,
				}).toString(),
		},
		{
			key: 'id',
			header: '상세보기',
			render: (row) => {
				return <Link href={`/review/${row.id}`}><Text type='body3' color='red'>상세보기</Text></Link>;
			},
		},
		{ key: 'status', header: '처리 상태', render: (row) => REVIEW_STATUS[row.status] },
		{ key: 'title', header: '상품명' },
		{
			key: 'contents',
			header: '리뷰 내용',
			width: '300px',
			render: (row) => (
				<div style={{ width: '400px' }}>
					<Text type='body3' align='center' className={ellipsis({ lineSize: 'line1' })}>
						{row.contents}
					</Text>
				</div>
			)
		},
		{ key: 'star', header: '평점' },
		{ key: 'name', header: '사용자 이름' },
		{ key: 'email', header: '사용자 ID' },
		{ key: 'createdDate', header: '작성일', render: (row) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
		{
			key: 'delete-id',
			header: '삭제',
			render: (row) => (
				<Button
					size='sm'
					onClick={() => handleAction('delete', { ids: [row.id] })}
				>
					삭제
				</Button>
			)
		},
	]

	if(!data) return null;

	return (
		<div>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={data?.reviewList as ReviewListData[]}
				columns={columns}
				page={page}
				onPageChange={onChangePage}
				totalPages={data?.page?.totalPages ?? 0}
				title={(
					<>
						리뷰 목록&nbsp;<Tooltip position='right'>1. 체크박스는 리뷰 승인 및 베스트리뷰 선정에 사용됩니다.<br/>2. 승인된 리뷰</Tooltip>
					</>
				)}
				emptyText='리뷰 목록 데이터가 없습니다.'
				action={(
					<div className={commonWrapper({ gap: 4, justify: 'start' })}>
						<Button
							variant='outline' type='assistive' size='sm'
							disabled={!allSelectedAreRequest}
							onClick={() => handleAction('approve', { ids: selectedIds as number[] })}
						>
							리뷰 승인&nbsp;
							<Tooltip position='right'>
								리뷰 승인은 요청 상태일 경우에만 가능합니다.
							</Tooltip>
						</Button>
						<Button
							variant='outline' type='assistive' size='sm'
							disabled={!allSelectedAreApproval}
							onClick={() => handleAction('selectBest', { ids: selectedIds as number[] })}
						>
							베스트 리뷰 선정&nbsp;
							<Tooltip position='right'>
								베스트 리뷰 선정은 승인 상태일 경우에만 가능합니다.
							</Tooltip>
						</Button>
					</div>
				)}
			/>
		</div>
	);
}