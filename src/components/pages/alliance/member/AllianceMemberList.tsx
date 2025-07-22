'use client';
import Link from "next/link";
import Text from "@/components/common/text/Text";
import TableSection from "@/components/common/tableSection/TableSection";
import AllianceSearchFilterGroup from "@/components/pages/alliance/common/searchFilterGroup/AllianceSearchFilterGroup";
import useSearchValues from "@/hooks/useSearchValues";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { INITIAL_ALLIANCE_SEARCH_VALUES } from "@/constants/alliance";
import { AllianceMemberListData, AllianceListSearchParams } from "@/types/alliance";
import { useGetAllianceMemberList } from "@/api/alliance/queries/useGetAllianceMemberList";
import { TableColumn } from "@/types/common";

export default function AllianceMemberList() {
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<AllianceListSearchParams>(INITIAL_ALLIANCE_SEARCH_VALUES);

	const { data } = useGetAllianceMemberList(page,submittedValues ?? INITIAL_ALLIANCE_SEARCH_VALUES);

	const columns: TableColumn<AllianceMemberListData>[] = [
		{
			key: "id",
			header: "번호",
			width: "60px",
			render: (_, index) =>
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
				const memberId = row.id;
				return <Link href={`/member/${memberId}`} target='_blank'><Text type='body3' color='red'>상세보기</Text></Link>;
			},
		},
		{ key: 'grade', header: '등급' },
		{ key: 'name', header: '이름' },
		{ key: 'email', header: '이메일' },
		{ key: 'phoneNumber', header: '연락처' },
		{
			key: 'dogName',
			header: '반려견 이름',
			render: (row) => row.dogName ? row.dogName : '-',
		},
		{
			key: 'subscribe',
			header: '정기구독 여부',
			render: (row) => row.subscribe ? 'Y' : 'N',
		},
		{
			key: 'accumulatedAmount',
			header: '누적구매금액',
			render: (row) => `${row.accumulatedAmount.toLocaleString()}원`,
		},
		{
			key: 'longUnconnected',
			header: '장기미접속',
			render: (row) => row.longUnconnected ? 'Y' : 'N',
		},
	]

	if (!data) return null;
	return (
		<div>
			<AllianceSearchFilterGroup
				searchValues={searchValues}
				setSearchValues={setSearchValues}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={data?.memberList}
				columns={columns}
				page={page ?? 0}
				onPageChange={onChangePage}
				totalPages={data?.page?.totalPages ?? 0}
				title='가입자 목록'
				emptyText='가입자 목록 데이터가 없습니다.'
			/>
		</div>
	);
}