import { commonWrapper, pointColor } from "@/styles/common.css";
import { useState } from "react";
import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import TableSection from "@/components/common/tableSection/TableSection";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import useSearchValues from "@/hooks/useSearchValues";
import { useGetPromotionMemberList } from "@/api/promotions/queries/useGetPromotionDetail";
import { PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES } from "@/constants/benefits/promotions";
import { PromotionMemberListData, PromotionMemberListSearchParams } from "@/types/benefits/promotions";
import { TableColumn } from "@/types/common";
import { SEARCH_CATEGORY } from "@/constants/common";
import { getTableRowNumber } from "@/utils/getTableRowNumber";

interface PromotionMemberTableProps {
	promotionId: number;
	usedCount: number;
	remaining: number;
	quantity: number;
}

export default function PromotionMemberTable({
	promotionId,
	usedCount,
	remaining,
	quantity,
}: PromotionMemberTableProps) {
	const [selectedCategory, setSelectedCategory] = useState<'name' | 'email'>('email');
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
	} = useSearchValues<PromotionMemberListSearchParams>(PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES);

	const { data } = useGetPromotionMemberList(promotionId, page, submittedValues ?? PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES);

	const columns: TableColumn<PromotionMemberListData>[] = [
		{ key: 'seq', header: '번호', width: '60px',
			render: (row: PromotionMemberListData, index: number) =>
				getTableRowNumber({
					totalElements: data?.page.totalElements as number,
					currentPage: data?.page.number as number,
					pageSize: data?.page.size as number,
					index,
				}).toString(),
		},
		{
			key: 'used',
			header: '사용 여부',
			render: (row: PromotionMemberListData) => row.used ? 'Y' : 'N'
		},
		{ key: 'email', header: '아이디' },
		{ key: 'name', header: '이름' },
		{
			key: 'createdDate',
			header: '등록 일시',
			render: (row: PromotionMemberListData) => format(new Date(row.createdDate), 'yyyy-MM-dd HH:mm:ss'),
		},
		{
			key: 'expiredDate',
			header: '만료 일시',
			render: (row: PromotionMemberListData) => format(new Date(row.expiredDate), 'yyyy-MM-dd HH:mm:ss'),
		},
		{
			key: 'remaining',
			header: '쿠폰 수량',
			render: (row: PromotionMemberListData) => `${row.remaining} / ${row.amount}`,
		},
	] as TableColumn<PromotionMemberListData>[];

	return (
		<Card shadow='none' padding={20} align='start' gap={8}>
			<div className={commonWrapper({ justify: 'start', align: 'center', gap: 32 })}>
				<Text type='title4'>참여 회원 정보</Text>
				<div className={commonWrapper({ align: 'center', gap: 16, width: 'auto' })}>
					<Text type='label3'>사용됨 <span className={pointColor}>{usedCount}</span></Text>
					<Text type='label3'>발행됨 <span className={pointColor}>{quantity - remaining}</span></Text>
					<Text type='label3'>수량 <span className={pointColor}>{quantity}</span></Text>
				</div>
			</div>
			<div className={commonWrapper({ align: 'center', gap: 8 })}>
				<SearchFilterKeyword
					categoryOptions={SEARCH_CATEGORY}
					selectedCategory={selectedCategory}
					keyword={searchValues[selectedCategory]}
					onChangeCategory={(category) => setSelectedCategory(category as 'email' | 'name')}
					onChangeKeyword={(keyword) => {
						setSearchValues({...searchValues, [selectedCategory]: keyword});
					}}
					onSubmit={onSubmit}
					placeholder='검색어를 입력해주세요.'
					showConfirmButton
				/>
			</div>
			<TableSection
				data={data?.promotionMemberList as PromotionMemberListData[]}
				columns={columns}
				page={page}
				onPageChange={onChangePage}
				totalPages={data?.page?.totalPages ?? 0}
				emptyText='참여 회원 목록 데이터가 없습니다.'
				padding='none'
			/>
		</Card>
	);
}