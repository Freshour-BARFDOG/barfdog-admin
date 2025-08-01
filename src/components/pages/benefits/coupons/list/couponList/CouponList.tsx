'use client';
import { useState } from "react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "@/components/common/inputField/InputField";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import useModal from "@/hooks/useModal";
import useSearchValues from "@/hooks/useSearchValues";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import { COUPON_LIST_INITIAL_SEARCH_VALUES, COUPON_TARGET, COUPON_TYPE, COUPON_TYPE_LIST } from "@/constants/benefits/coupons";
import { useGetCouponList } from "@/api/coupons/queries/useGetCouponList";
import { useUpdateCouponInactive } from "@/api/coupons/mutations/useUpdateCouponInactive";
import { SearchFilterItem, TableColumn } from "@/types/common";
import { CouponListData, CouponListSearchParams } from "@/types/benefits/coupons";

export default function CouponList() {
	const queryClient = useQueryClient();
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<CouponListSearchParams>(COUPON_LIST_INITIAL_SEARCH_VALUES);
	const { data } = useGetCouponList(page,submittedValues ?? COUPON_LIST_INITIAL_SEARCH_VALUES);
	const couponType = submittedValues?.couponType;

	const { mutate: updateCouponInactive } = useUpdateCouponInactive();

	const { addToast } = useToastStore();
	const { isOpen: isOpenDeleteConfirmModal, onClose: onCloseDeleteConfirmModal, onToggle: onToggleDeleteConfirmModal } = useModal();

	const [selectedCoupon, setSelectedCoupon] = useState<CouponListData | null>(null);

	const handleUpdateCouponInactive = () => {
		if (!selectedCoupon) return;

		updateCouponInactive({
			couponId: selectedCoupon.id,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COUPONS.BASE,
						queryKeys.COUPONS.GET_COUPON_LIST,
						page,
						submittedValues,
					],
				});
				addToast('쿠폰 삭제가 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('쿠폰 삭제에 실패했습니다');
			}
		})
	}

	const filters: SearchFilterItem[] = [
		{
			label: '쿠폰 이름',
			children: (
				<InputField
					value={searchValues.keyword}
					onChange={(e) => setSearchValues({ ...searchValues, keyword: e.target.value })}
					width={350}
					onSubmit={onSubmit}
				/>
			),
		},
		{
			label: '쿠폰 타입',
			children: (
				<LabeledRadioButtonGroup
					options={COUPON_TYPE_LIST}
					value={searchValues.couponType}
					onChange={(value) => setSearchValues({ ...searchValues, couponType: value as keyof typeof COUPON_TYPE })}
					optionType="radio"
				/>
			),
		},
	]

	const columns: TableColumn<CouponListData>[] = [
		{ key: 'seq', header: '번호', width: '60px',
			render: (row: CouponListData, index: number) =>
				getTableRowNumber({
					totalElements: data?.page.totalElements as number,
					currentPage: data?.page.number as number,
					pageSize: data?.page.size as number,
					index,
				}).toString(),
		},
		{ key: 'couponType', header: '쿠폰 종류', render: (row: CouponListData) => COUPON_TYPE[row.couponType as keyof typeof COUPON_TYPE] },
		couponType !== 'AUTO_PUBLISHED' ? {
			key: 'code',
			header: '쿠폰 코드',
			render: (row: CouponListData) => !row.code ? '-' : row.code
		} : undefined,
		couponType !== 'AUTO_PUBLISHED' ? {
			key: 'expiredDate',
			header: '만료일자',
			render: (row: CouponListData) => row.expiredDate === null ? '-' : format(new Date(row.expiredDate), 'yyyy-MM-dd')
		} : undefined,
		{ key: 'name', header: '쿠폰 이름' },
		{ key: 'description', header: '쿠폰 설명' },
		{ key: 'discount', header: '할인 금액' },
		{ key: 'couponTarget', header: '사용처', render: (row: CouponListData) => COUPON_TARGET[row.couponTarget as keyof typeof COUPON_TARGET] },
		{ key: 'amount', header: '사용 한도' },
		{
			key: 'id',
			header: '삭제',
			render: (row: CouponListData) => {
				if (row.couponType === 'AUTO_PUBLISHED') {
					return <Text type='body3' color='red'>삭제불가</Text>
				} else {
					return (
						<Button
							onClick={() => {
								setSelectedCoupon(row);
								onToggleDeleteConfirmModal();
							}}
							size='sm'
						>
							삭제
						</Button>
					)
				}
			},
		},
	].filter(Boolean) as TableColumn<CouponListData>[];;

	return (
		<ListLayout>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={data?.couponList as CouponListData[]}
				columns={columns}
				page={page}
				onPageChange={onChangePage}
				totalPages={data?.page?.totalPages ?? 0}
				title={(
					<TooltipInfo title='쿠폰 목록'>
						<div>
							1. 자동발행쿠폰은 생성 및 삭제할 수 없습니다.<br/>
							2. 자동발행쿠폰 중 등급별 쿠폰은 매달 1일, 생일 쿠폰은 해당 월 1일에 자동발급됩니다.<br/>
							3. 직접발행 쿠폰은 유효기간이 존재하는 항목만 목록에 나타납니다.<br/>
							4. 직접발행 쿠폰의 만료일자는 동일한 쿠폰을 2회 이상 발급했을 시, 가장 늦은 만료일자를 기준으로 표기됩니다.
						</div>
					</TooltipInfo>
				)}
				emptyText='쿠폰 목록 데이터가 없습니다.'
			/>
			{isOpenDeleteConfirmModal &&
				<AlertModal
					title='쿠폰 삭제'
					content={`선택된 쿠폰 (${selectedCoupon?.name})을 삭제하시겠습니까?`}
					isOpen={isOpenDeleteConfirmModal}
					onClose={() => {
						setSelectedCoupon(null);
						onCloseDeleteConfirmModal();
					}}
					confirmText='확인'
					cancelText='취소'
					onConfirm={handleUpdateCouponInactive}
				/>
			}
		</ListLayout>
	);
}