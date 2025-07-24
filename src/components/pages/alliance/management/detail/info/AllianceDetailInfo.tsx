'use client';
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import DetailTable from "@/components/common/detailTable/DetailTable";
import type { AllianceCouponUsedInfo, AllianceDetailInfo } from "@/types/alliance";

interface AllianceDetailInfoProps {
	defaultInfo: AllianceDetailInfo;
	couponUsedInfo: AllianceCouponUsedInfo;
}

export default function AllianceDetailInfo({
	defaultInfo,
	couponUsedInfo,
}: AllianceDetailInfoProps) {
	const defaultInfoList = [
		{ label: '제휴사', value: defaultInfo.allianceName },
		{ label: 'Prefix', value: defaultInfo.allianceCode },
		{
			label: '행사',
			value: (
				defaultInfo.eventNameList.length > 0
					? (
						<div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
							{defaultInfo.eventNameList.map(event => (
								<Text key={event} type='body3'>• {event}</Text>
							))}
						</div>
					)
					: '-'
			)
		},
		{ label: '쿠폰 생성 개수', value: defaultInfo.createdCouponCount },
	]

	const couponUsedInfoList = [
		{ label: '쿠폰 등록 개수', value: couponUsedInfo.registeredCouponCount },
		{ label: '쿠폰 사용 개수', value: couponUsedInfo.usedCouponCount },
		{ label: '일반 상품', value: couponUsedInfo.generalItemCount },
		{ label: '구독 상품', value: couponUsedInfo.subscriptionItemCount },
	]

	return (
		<>
			<DetailTable items={defaultInfoList} title='제휴사 정보' columns={2} />
			<DetailTable items={couponUsedInfoList} title='전체 쿠폰 사용 현황' columns={2} />
		</>
	);
}