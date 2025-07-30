import { format } from "date-fns";
import DetailTable from "@/components/common/detailTable/DetailTable";

interface LoginInfoData {
	longUnconnected: boolean;
	lastLoginDate: string;
	withdrawal: boolean;
}

interface LoginInfoProps {
	data: LoginInfoData;
}

export default function LoginInfo({ data }: LoginInfoProps) {
	const loginInfo = [
		{ label: '장기 미접속', value: data.longUnconnected ? 'Y' : 'N' },
		{ label: '탈퇴 여부', value: data.withdrawal ? 'Y' : 'N',  },
		{ label: '마지막 로그인', value: format(new Date(data.lastLoginDate), 'yyyy-MM-dd HH:mm:ss'), fullWidth: true },
	];

	return (
		<DetailTable items={loginInfo} columns={2} title='로그인 정보' />
	);
}