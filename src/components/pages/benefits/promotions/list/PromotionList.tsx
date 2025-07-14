'use client';
import { commonWrapper } from "@/styles/common.css";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import LabeledCheckboxGroup from "@/components/common/labeledCheckBoxGroup/LabeledCheckBoxGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import Text from "@/components/common/text/Text";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useSearchValues from "@/hooks/useSearchValues";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { useToastStore } from "@/store/useToastStore";
import useModal from "@/hooks/useModal";
import { DISCOUNT_UNIT_TYPE } from "@/constants/common";
import {
	PROMOTION_LIST_INITIAL_SEARCH_VALUES,
	PROMOTION_STATUS,
	PROMOTION_STATUS_LIST
} from "@/constants/benefits/promotions";
import { COUPON_TARGET } from "@/constants/benefits/coupons";
import { SearchFilterItem, TableColumn } from "@/types/common";
import { PromotionListData , PromotionListSearchParams, PromotionStatus} from "@/types/benefits/promotions";
import { useGetPromotionList } from "@/api/promotions/queries/useGetPromotionList";
import { useDeletePromotion } from "@/api/promotions/mutations/useDeletePromotion";
import { queryKeys } from "@/constants/queryKeys";

export default function PromotionList() {
	const queryClient = useQueryClient();

	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<PromotionListSearchParams>(PROMOTION_LIST_INITIAL_SEARCH_VALUES);
	const [selectedCategory, setSelectedCategory] = useState<'name'>('name');

	const { data } = useGetPromotionList(page,submittedValues ?? PROMOTION_LIST_INITIAL_SEARCH_VALUES);

	const { isOpen: isOpenDeleteConfirmModal, onClose: onCloseDeleteConfirmModal, onToggle: onToggleDeleteConfirmModal } = useModal();
	const { mutate } = useDeletePromotion();
	const { addToast } = useToastStore();

	const handleDeletePromotion = (promotionId: number, status: PromotionStatus) => {
		if (status !== 'INACTIVE') {
			onToggleDeleteConfirmModal();
			return;
		} else {
			mutate(
				{ promotionId: promotionId },
				{
					onSuccess: async () => {
						// 프로모션 목록
						await queryClient.invalidateQueries({
							queryKey: [
								queryKeys.PROMOTIONS.BASE,
								queryKeys.PROMOTIONS.GET_PROMOTION_LIST,
								page,
								submittedValues,
							],
						});
						// 프로모션 쿠폰 목록
						await queryClient.invalidateQueries({
							queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_COUPON_LIST],
						});
						addToast('프로모션 삭제가 완료되었습니다');
					},
					onError: (error) => {
						console.log(error);
						addToast('프로모션 삭제에 실패했습니다.\n관리자에게의 문의해주세요.')
					}
				}
			)
		}
	}

	const filters: SearchFilterItem[] = [
		{
			label: '프로모션 타입',
			children: (
				<LabeledRadioButton
					label='쿠폰'
					isChecked={searchValues.promotionType === 'COUPON'}
					value={searchValues.promotionType}
					onToggle={() => setSearchValues({...searchValues, promotionType: 'COUPON'})}
				/>
			),
		},
		{
			label: '프로모션 상태',
			children: (
				<LabeledCheckboxGroup
					options={PROMOTION_STATUS_LIST}
					selectedValues={searchValues.statusList}
					onChange={(newSelected) =>
						setSearchValues({ ...searchValues, statusList: newSelected as PromotionStatus[] })
					}
				/>
			),
		},
		{
			label: '조건 검색',
			children: (
				<SearchFilterKeyword
					categoryOptions={[{ label: '이름', value: 'name' }]}
					selectedCategory={selectedCategory}
					keyword={searchValues[selectedCategory]}
					onChangeCategory={(category) => setSelectedCategory(category as 'name')}
					onChangeKeyword={(keyword) => {
						setSearchValues({...searchValues, [selectedCategory]: keyword});
					}}
					onSubmit={onSubmit}
				/>
			),
		},
	]

	const columns: TableColumn<PromotionListData>[] = [
		{ key: 'seq', header: '번호', width: '60px',
			render: (row: PromotionListData, index: number) =>
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
			render: (row: PromotionListData) =>
				<Link href={`/promotion/${row.promotionId}`} target="_blank">
					<Text type="body3" color="red">상세보기</Text>
				</Link>
		},
		{
			key: 'status',
			header: '상태',
			render: (row: PromotionListData) =>
				<Text 
					type='body3' 
					color={
						row.status === 'ACTIVE' 
							? 'pastelRed' 
							: row.status === 'INACTIVE' 
								? 'gray600' 
								: 'gray900'
					}
				>
					{PROMOTION_STATUS[row.status]}
				</Text>
		},
		{ key: 'name', header: '이름' },
		{
			key: 'count',
			header: '사용/발행/수량',
			render: (row: PromotionListData) =>
				`${row.usedCount} / ${row.quantity - row.remaining} / ${row.quantity}`
		},
		{
			key: 'expiredDate',
			header: '기간',
			render: (row: PromotionListData) =>
				<Text type='body3'>
					{format(new Date(row.startDate), 'yyyy-MM-dd HH:mm:ss')}  ~<br/>
					{format(new Date(row.expiredDate), 'yyyy-MM-dd HH:mm:ss')}<br/>
				</Text>
		},
		{
			key: 'info',
			header: '쿠폰 정보 (코드/이름/사용처/혜택/한도)',
			width: 400,
			render: (row: PromotionListData) =>
				<div className={commonWrapper({ direction: 'col', align: 'center', gap: 4 })}>
					<Text type='body3'>{row.code} / {row.name}</Text>
					<Text type='body3' color='gray600' align='center'>
						{COUPON_TARGET[row.couponTarget]} / {row.discountDegree}{DISCOUNT_UNIT_TYPE[row.discountType]} 할인
						({row.availableMinPrice.toLocaleString()}원 이상 구매시 / 최대 {row.availableMaxDiscount.toLocaleString()}원 할인)<br/>
						한도: {row.amount}회
					</Text>
				</div>
		},
		{
			key: 'id',
			header: '삭제',
			render: (row: PromotionListData) =>
				<Button onClick={() => handleDeletePromotion(row.promotionId, row.status)} size='sm'>삭제</Button>
		},
	] as TableColumn<PromotionListData>[];

	if(!data) return null;
	return (
		<>
		<section>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={data?.promotionList as PromotionListData[]}
				columns={columns}
				page={page}
				onPageChange={onChangePage}
				totalPages={data?.page?.totalPages ?? 0}
				title='프로모션 목록'
				emptyText='프로모션 목록 데이터가 없습니다.'
			/>
		</section>
			{isOpenDeleteConfirmModal &&
				<AlertModal
					title=''
					content={`프로모션 [종료] 상태에서만\n 삭제할 수 있습니다.`}
					isOpen={isOpenDeleteConfirmModal}
					onClose={onCloseDeleteConfirmModal}
					confirmText='확인'
					onConfirm={onCloseDeleteConfirmModal}
				/>
			}
		</>
	);
}