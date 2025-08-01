'use client';
import { useState } from "react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "@/components/common/inputField/InputField";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SelectBox from "@/components/common/selectBox/SelectBox";
import DatePicker from "@/components/common/datePicker/DatePicker";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import useSearchValues from "@/hooks/useSearchValues";
import { useGetMemberCouponList } from "@/api/coupons/queries/useGetMemberCouponList";
import { useUpdateMemberCoupon } from "@/api/coupons/mutations/useUpdateMemberCoupon";
import { SearchFilterItem, TableColumn } from "@/types/common";
import { MemberCouponListBody, MemberCouponListData } from "@/types/benefits/coupons";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import {
	MEMBER_COUPON_LIST_INITIAL_SEARCH_VALUES,
	MEMBER_COUPON_ROLE,
	MEMBER_COUPON_ROLE_LIST,
	MEMBER_COUPON_SEARCH_CATEGORY
} from "@/constants/benefits/coupons";

export default function MemberCouponList() {
	const queryClient = useQueryClient();
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<MemberCouponListBody>(MEMBER_COUPON_LIST_INITIAL_SEARCH_VALUES);
	const { data } = useGetMemberCouponList(page,submittedValues ?? MEMBER_COUPON_LIST_INITIAL_SEARCH_VALUES);

	const [selectedCategory, setSelectedCategory] = useState<'memberEmail' | 'memberName'>('memberEmail');
	const [selectedCoupon, setSelectedCoupon] = useState<MemberCouponListData | null>(null);

	const { mutate: updateMemberCoupon } = useUpdateMemberCoupon();
	const { addToast } = useToastStore();

	const handleUpdateMemberCoupon = () => {
		if (!selectedCoupon) return;

		const body = {
			expiredDate: format(new Date(selectedCoupon.expiredDate), 'yyyy-MM-dd'),
			memberCouponStatus: selectedCoupon.memberCouponStatus,
			remaining: selectedCoupon.remaining,
		}

		updateMemberCoupon({
			couponId: selectedCoupon.id,
			body
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COUPONS.BASE,
						queryKeys.COUPONS.GET_MEMBER_COUPON_LIST,
						page,
						submittedValues,
					],
				});
				addToast('쿠폰 수정이 완료되었습니다!');
			},
			onError: () => {
				addToast('쿠폰 수정에 실패했습니다');
			}
		})
	}

	const getEditedValue = <K extends keyof MemberCouponListData>(
		row: MemberCouponListData,
		key: K
	): MemberCouponListData[K] => {
		const formattedValue = (data: MemberCouponListData): MemberCouponListData[K] =>
			key === 'expiredDate'
				? (format(new Date(data[key] as string), 'yyyy-MM-dd') as MemberCouponListData[K])
				: data[key];
	
		return selectedCoupon && selectedCoupon.id === row.id
			? formattedValue(selectedCoupon)
			: formattedValue(row);
	};

	const updateSelectedCouponField = <K extends keyof MemberCouponListData>(
		row: MemberCouponListData,
		key: K,
		value: MemberCouponListData[K]
	) => {
		if (!selectedCoupon || selectedCoupon.id !== row.id) {
			setSelectedCoupon({ ...row, [key]: value });
		} else {
			setSelectedCoupon({ ...selectedCoupon, [key]: value });
		}
	}

	const filters: SearchFilterItem[] = [
		{
			label: (
				<TooltipInfo title='발급 기간'>
					좌측 조회기간은 우측 조회기간보다 과거시점이어야 합니다.
				</TooltipInfo>
			),
			children: (
				<DateRangeFilter
					value={{
						startDate: searchValues.createdDateFrom,
						endDate: searchValues.createdDateTo
					}}
					onChangeRange={(value) => {
						const { startDate, endDate } = value;
						setSearchValues({
							...searchValues,
							createdDateFrom: startDate as string,
							createdDateTo: endDate as string,
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
					categoryOptions={MEMBER_COUPON_SEARCH_CATEGORY}
					selectedCategory={selectedCategory}
					keyword={searchValues[selectedCategory]}
					onChangeCategory={(category) => setSelectedCategory(category as 'memberEmail' | 'memberName')}
					onChangeKeyword={(keyword) => {
						setSearchValues({...searchValues, [selectedCategory]: keyword});
					}}
					onSubmit={onSubmit}
				/>
			),
		},
		{
			label: '회원 유형',
			children: (
				<LabeledRadioButtonGroup
					options={MEMBER_COUPON_ROLE_LIST}
					value={searchValues.role}
					onChange={(value) => setSearchValues({ ...searchValues, role: value as keyof typeof MEMBER_COUPON_ROLE })}
					optionType="radio"
				/>
			),
		},
	]

	const columns: TableColumn<MemberCouponListData>[] = [
		{ key: 'id', header: '번호', width: '60px',
			render: (row, index) =>
				getTableRowNumber({
					totalElements: data?.page.totalElements as number,
					currentPage: data?.page.number as number,
					pageSize: data?.page.size as number,
					index,
				}).toString(),
		},
		{ key: 'memberName', header: '이름' },
		{ key: 'memberEmail', header: '아이디' },
		{ key: 'couponName', header: '쿠폰 이름' },
		{
			key: 'code',
			header: '쿠폰 코드',
			render: (row) => row.code ? row.code : '-',
		},
		{
			key: 'memberCouponStatus',
			header: '쿠폰 상태',
			width: '100px',
			render: (row) => {
				return (
					<SelectBox
						options={[{ label: '활성', value: 'ACTIVE' }, { label: '비활성', value: 'INACTIVE' }]}
						value={getEditedValue(row, 'memberCouponStatus')}
						onChange={(value) => updateSelectedCouponField(row, 'memberCouponStatus', value)}
					/>
				)
			},
		},
		{
			key: 'remaining',
			header: '남은 개수',
			width: '90px',
			render: (row) => {
				return (
					<InputField
						value={getEditedValue(row, 'remaining')}
						onChange={(e) => updateSelectedCouponField(row, 'remaining', Number(e.target.value))}
					/>
				)
			},
		},
		{
			key: 'createdDate',
			header: '발급 날짜',
			render: (row) => format(new Date(row.createdDate), 'yyyy-MM-dd'),
		},
		{
			key: 'expiredDate',
			header: '만료 기한',
			render: (row) => {
				return (
					<DatePicker
						value={getEditedValue(row, 'expiredDate')}
						onChange={(e) => updateSelectedCouponField(row, 'expiredDate', e.target.value)}
					/>
				)
			},
		},
		{
			key: 'id',
			header: '수정',
			render: (row) => {
				return (
					<Button
						onClick={handleUpdateMemberCoupon}
						disabled={!selectedCoupon || selectedCoupon.id !== row.id}
						size='sm'
					>
						수정
					</Button>
				)
			},
		},
	]

	return (
		<ListLayout>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={data?.memberCouponList as MemberCouponListData[]}
				columns={columns}
				page={page}
				onPageChange={onChangePage}
				totalPages={data?.page?.totalPages ?? 0}
				title='멤버 쿠폰 목록'
				emptyText='멤버 쿠폰 목록 데이터가 없습니다.'
			/>
		</ListLayout>
	);
}