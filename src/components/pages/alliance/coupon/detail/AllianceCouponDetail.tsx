'use client';
import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { ALLIANCE_COUPON_TARGET } from "@/constants/alliance";
import { useGetAllianceCouponDetail } from "@/api/alliance/queries/useGetAllianceCouponDetail";

interface AllianceCouponDetailProps {
	bundle: string;
}

export default function AllianceCouponDetail({ bundle }: AllianceCouponDetailProps) {
	const router = useRouter();
	
	const { data } = useGetAllianceCouponDetail(bundle);

	if (!data) return null;

	const couponInfo = data.couponInfo;
	const couponUsedInfo = data.couponUsedHistory;

	const couponInfoList = [
		{ label: '쿠폰 생성일', value: format(new Date(couponInfo.createdCouponDate), 'yyyy-MM-dd HH:mm:ss'), fullWidth: true },
		{ label: '제휴사', value: couponInfo.allianceName },
		{ label: '행사', value: couponInfo.eventName },
		{ label: '쿠폰 이름', value: couponInfo.couponName },
		{ label: '쿠폰 설명', value: couponInfo.couponName },
		{ label: '사용처', value: ALLIANCE_COUPON_TARGET[couponInfo.couponTarget] },
		{ label: '할인', value: couponInfo.discountDegree },
		{ label: '최대 할인 금액', value: `${couponInfo.availableMaxDiscount.toLocaleString()}원` },
		{ label: '최소 사용 금액', value: `${couponInfo.availableMinPrice.toLocaleString()}원` },
		{ label: '쿠폰 개수', value: `${couponInfo.couponCount.toLocaleString()}개` },
		{ label: '쿠폰 코드 자릿수', value: `${couponInfo.couponCodeLength}자리` },
		{ label: '쿠폰 사용 시작일', value: format(new Date(couponInfo.useStartDate), 'yyyy-MM-dd HH:mm:ss') },
		{ label: '쿠폰 사용 종료일', value: format(new Date(couponInfo.useExpiredDate), 'yyyy-MM-dd HH:mm:ss') },
	]

	const couponUsedInfoList = [
		{ label: '쿠폰 등록 개수', value: couponUsedInfo.couponCreatedCount },
		{ label: '쿠폰 사용 개수', value: couponUsedInfo.usedCouponCount },
		{ label: '일반 상품', value: couponUsedInfo.generalItemCount },
		{ label: '구독 상품', value: couponUsedInfo.subscriptionItemCount },
	]
	
	return (
		<div className={commonWrapper({ direction: 'col', gap: 20,  })}>
			<Card shadow='none' padding={20} className={commonWrapper({ direction: 'col', gap: 20, align: 'start' })}>
				<Text type='title2'>{data?.couponInfo.couponName}</Text>
				<DetailTable items={couponInfoList} title='쿠폰 정보' columns={2} />
				<DetailTable items={couponUsedInfoList} title='쿠폰 사용 현황' columns={2} />
			</Card>
			<Button onClick={() => router.push('/alliance/coupon')}>목록</Button>
		</div>
	);
}