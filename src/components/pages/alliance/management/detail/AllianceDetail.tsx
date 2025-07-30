'use client';
import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import AllianceDetailInfo from "@/components/pages/alliance/management/detail/info/AllianceDetailInfo";
import AllianceEventTable from "@/components/pages/alliance/management/detail/table/AllianceEventTable";
import { useGetAllianceDetail } from "@/api/alliance/queries/useGetAllianceDetail";

interface AllianceDetailProps {
	allianceId: number;
}

export default function AllianceDetail({ allianceId }: AllianceDetailProps) {
	const router = useRouter();
	
	const { data } = useGetAllianceDetail(allianceId);

	if (!data) return null;
	return (
		<div className={commonWrapper({ direction: 'col', gap: 20,  })}>
			<Card shadow='none' padding={20} className={commonWrapper({ direction: 'col', gap: 20, align: 'start' })}>
				<Text type='title2'>{data?.allianceInfo.allianceName}</Text>
				<AllianceDetailInfo
					defaultInfo={data?.allianceInfo}
					couponUsedInfo={data?.allianceCouponUsedInfo}
				/>
			</Card>
			<Card shadow='none' padding={20}>
				<AllianceEventTable
					allianceId={allianceId}
					eventInfoList={data?.allianceEventInfoList}
				/>
			</Card>
			<Button onClick={() => router.push('/alliance/management')}>목록</Button>
		</div>
	);
}