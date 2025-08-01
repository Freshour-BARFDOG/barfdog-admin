'use client';
import { format } from "date-fns";
import TableSection from "@/components/common/tableSection/TableSection";
import AllianceSearchFilterGroup from "@/components/pages/alliance/common/searchFilterGroup/AllianceSearchFilterGroup";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import useSearchValues from "@/hooks/useSearchValues";
import { ALLIANCE_NAMES, INITIAL_ALLIANCE_SEARCH_VALUES } from "@/constants/alliance";
import { ORDER_STATUS, ORDER_TYPE_LABEL_MAP } from "@/constants/sales";
import { AllianceListSearchParams, AllianceMemberSalesData } from "@/types/alliance";
import { useGetAllianceSalesList } from "@/api/alliance/queries/useGetAllianceSalesList";
import { TableColumn } from "@/types/common";

export default function AllianceSalesList() {
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<AllianceListSearchParams>(INITIAL_ALLIANCE_SEARCH_VALUES);

	const { data } = useGetAllianceSalesList(submittedValues ?? INITIAL_ALLIANCE_SEARCH_VALUES);

	const columns: TableColumn<AllianceMemberSalesData>[] = [
		{
			key: "id",
			header: "번호",
			width: "60px",
			render: (_, index) => index + 1
		},
		{
			key: 'dtype',
			header: '주문 유형',
			render: (row) => ORDER_TYPE_LABEL_MAP[row.dtype],
		},
		{ key: 'merchantUid', header: '주문 번호' },
		{ key: 'email', header: '이메일' },
		{
			key: 'orderStatus',
			header: '주문 상태',
			render: (row) => {
				const status = ORDER_STATUS.find(status => status.value === row.orderStatus);
				return status?.label ?? '-';
			}
		},
		{
			key: 'paymentDate',
			header: '결제일',
			render: (row) => format(new Date(row.paymentDate), 'yyyy-MM-dd HH:mm:ss'),
		},
		{
			key: 'paymentPrice',
			header: '최종 결제금',
			render: (row) => `${row.paymentPrice.toLocaleString()}원`,
		},
		{
			key: 'allianceDiscount',
			header: '제휴 할인금',
			render: (row) => `${row.allianceDiscount.toLocaleString()}원`,
		},
		{
			key: 'alliance',
			header: '제휴사',
			render: (row) => ALLIANCE_NAMES[row.alliance],
		},
	]

	if (!data) return null;
	return (
		<ListLayout>
			<AllianceSearchFilterGroup
				type='sales'
				searchValues={searchValues}
				setSearchValues={setSearchValues}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={data}
				columns={columns}
				page={0}
				onPageChange={onChangePage}
				totalPages={0}
				title='매출 목록'
				emptyText='매출 목록 데이터가 없습니다.'
			/>
		</ListLayout>
	);
}