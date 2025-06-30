import { ReactNode } from "react";
import Link from "next/link";
import Text from "@/components/common/text/Text";
import TableSection from "@/components/common/tableSection/TableSection";
import { TableColumn } from "@/types/common";
import { MemberListData, MemberListResponse } from "@/types/member";

interface MemberTableProps {
	data: MemberListResponse;
	firstRow: TableColumn<MemberListData>;
	page?: number;
	onChangePage?: (page: number) => void;
	action?: ReactNode;
	padding?: 'none' | 20 | 40;
	showTitle?: boolean;
}

export default function MemberTable({
	firstRow,
	data,
	page,
	onChangePage,
	action,
	padding,
	showTitle = true,
}: MemberTableProps) {
	const columns: TableColumn<MemberListData>[] = [
		firstRow,
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
	return (
		<TableSection
			data={data?.memberList as MemberListData[]}
			columns={columns}
			page={page ?? 0}
			onPageChange={onChangePage}
			totalPages={data?.page?.totalPages ?? 0}
			title={showTitle ? '회원 목록' : undefined}
			emptyText='회원 목록 데이터가 없습니다.'
			action={action}
			padding={padding}
		/>
	);
}