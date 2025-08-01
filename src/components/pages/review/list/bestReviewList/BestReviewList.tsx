'use client';
import { useState } from "react";
import { format } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import { commonWrapper, ellipsis } from "@/styles/common.css";
import { baseStyle, buttonVariants } from "@/components/common/button/Button.css";
import { useQueryClient } from "@tanstack/react-query";
import TableSection from "@/components/common/tableSection/TableSection";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import useReviewAction from "@/hooks/useReviewAction";
import { queryKeys } from "@/constants/queryKeys";
import { REVIEW_ACTION_LABEL_MAP } from "@/constants/review";
import { TableColumn } from "@/types/common";
import { BestReviewData, BestReviewLeakedOrder } from "@/types/review";
import { useGetBestReviewList } from "@/api/review/queries/useGetBestReviewList";

function getUpdatedLeakedOrderList(
	list: BestReviewData[],
	targetId: number,
	direction: 'up' | 'down'
): BestReviewLeakedOrder[] {
	const index = list.findIndex((item) => item.id === targetId);
	if (index === -1) return [];

	const swapIndex = direction === 'up' ? index - 1 : index + 1;

	// 범위 벗어나면 아무 작업도 안 함
	if (swapIndex < 0 || swapIndex >= list.length) return [];

	// 복사 후 순서 교환
	const newList = [...list];
	[newList[index], newList[swapIndex]] = [newList[swapIndex], newList[index]];

	// leakedOrder는 index + 1로 다시 정렬
	return newList.map((item, i) => ({
		id: item.id,
		leakedOrder: i + 1,
	}));
}

export default function BestReviewList() {
	const queryClient = useQueryClient();

	const { data } = useGetBestReviewList();
	const { handleAction } = useReviewAction({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_BEST_REVIEW_LIST],
			});
		},
	});
	const [editMode, setEditMode] = useState(false);

	const columns: TableColumn<BestReviewData>[] = [
		{
			key: 'leakedOrder',
			header: '순서',
			width: '60px',
			render: (row) =>
				editMode ? (
					<div className={commonWrapper({ align: 'center', gap: 4 })}>
						{['up', 'down'].map(dir => (
							<button
								key={dir}
								onClick={() => {
									const leakedOrderDtoList = getUpdatedLeakedOrderList(data as BestReviewData[], row.id, dir as 'up' | 'down');
									if (leakedOrderDtoList.length === 0) return;

									handleAction('reorderBest', { leakedOrderDtoList })
								}}
								className={`${baseStyle} ${buttonVariants.outline.assistive}`}
							>
								{dir === 'up'
									? <ArrowUp size={16} />
									: <ArrowDown size={16} />
								}
							</button>
						))}
					</div>
				) : (
					row.leakedOrder
				),
		},
		{ key: 'reviewId', header: '리뷰 ID'},
		{ key: 'id', header: '베스트 리뷰 ID'},
		{ key: 'title', header: '상품명'},
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
					onClick={() => handleAction('deleteBest', { ids: [row.id] })}
				>
					삭제
				</Button>
			)
		},
	]

	return (
		<ListLayout>
			<TableSection
				data={data as BestReviewData[]}
				columns={columns}
				page={0}
				totalPages={0}
				title='베스트 리뷰 목록'
				emptyText='베스트 리뷰 목록 데이터가 없습니다.'
				action={(
					<Button
						variant="outline"
						type="assistive"
						size="sm"
						onClick={() => setEditMode((prev) => !prev)}
					>
						{REVIEW_ACTION_LABEL_MAP['reorderBest']} {editMode ? '닫기' : ''}
					</Button>
				)}
			/>
		</ListLayout>
	);
}