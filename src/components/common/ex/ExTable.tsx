'use client';
import { TableColumn } from "@/types/common";
import Table from "@/components/common/table/Table";
import Text from "@/components/common/text/Text";

export type Member = {
	id: number;
	grade: string;
	name: string;
	email: string;
	phoneNumber: string;
	dogName: string | null;
	accumulatedAmount: number;
	subscribe: boolean;
	longUnconnected: boolean;
	alliance: null | 'cb';
	gender: 'MALE' | 'FEMALE';
};

export const dummyMemberData: Member[] = [
	{
		id: 2725,
		grade: "브론즈",
		name: "박수인",
		email: "mom3133@naver.com",
		phoneNumber: "01099461926",
		dogName: null,
		accumulatedAmount: 0,
		subscribe: true,
		longUnconnected: false,
		alliance: null,
		gender: 'MALE',
	},
	{
		id: 2724,
		grade: "브론즈",
		name: "신지영",
		email: "fish8624@naver.com",
		phoneNumber: "01059588624",
		dogName: "코코",
		accumulatedAmount: 0,
		subscribe: false,
		longUnconnected: false,
		alliance: "cb",
		gender: 'FEMALE',
	}
];

export const memberTableColumns: TableColumn<Member>[] = [
	{ key: 'id', header: 'ID', width: '60px' },
	{ key: 'name', header: '이름' },
	{ key: 'grade', header: '등급' },
	{ key: 'email', header: '이메일', width: '200px' },
	{ key: 'phoneNumber', header: '연락처' },
	{
		key: 'dogName',
		header: '반려견 이름',
		width: 100,
		render: (row) => row.dogName ? row.dogName : '-',
	},
	{
		key: 'gender',
		header: '성별',
	},
	{ key: 'accumulatedAmount', header: '누적구매금액', width: 120, },
	{
		key: 'longUnconnected',
		header: '장기미접속', width: 100,
		render: (row) => row.longUnconnected ? 'Y' : 'N',
	},
	{
		key: 'subscribe',
		header: '정기구독 여부', width: 120,
		render: (row) => {
			const color = {
				true: 'green',
				false: 'red',
			}[String(row.subscribe)];
			return <span style={{ color }}>{row.subscribe ? 'Y' : 'N'}</span>;
		},
	},
	{
		key: 'alliance',
		header: '제휴사',
		render: (row) => row.alliance ? row.alliance : '-',
	},
];

const ExTable = () => {
	return (
		<article style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
			<div>
				<Text type='title3'>Table 예시</Text>
				<Table data={[]} columns={memberTableColumns} emptyText='회원 목록 데이터가 없습니다.' />
			</div>
			<Table data={dummyMemberData} columns={memberTableColumns} emptyText='회원 목록 데이터가 없습니다.' />
		</article>
	);
};

export default ExTable;