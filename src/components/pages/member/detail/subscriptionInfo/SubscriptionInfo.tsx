import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import { MemberSubscriptionData } from '@/types/member';
import { useGetMemberSubscriptionList } from "@/api/member/queries/useGetMemberSubscriptionList";
import DetailTable from "@/components/common/detailTable/DetailTable";

interface SubscriptionInfoProps {
	memberId: number;
}

function calcPaymentPrice (data: MemberSubscriptionData) {
	const paymentPrice = data.nextPaymentPrice
		- data.discountGrade
		- data.discountCoupon;
	return Math.max(paymentPrice, 100);
}

export default function SubscriptionInfo({ memberId }: SubscriptionInfoProps) {
	const { data: subscriptionList } = useGetMemberSubscriptionList(memberId);

	const subscriptionDetailInfo = (data: MemberSubscriptionData, recipeNames: string[]) => {
		return [
			{ label: '반려견 이름', value: data.dogName },
			{ label: '구독 회차', value: `${data.subscribeCount}회` },
			{ label: '플랜', value: data.plan },
			{ label: '생성 일자', value: format(new Date(data.subscribeStartDate), 'yyyy-MM-dd') },
			{ label: '레시피', value: recipeNames.join(', ') },
			{ label: '못먹는 음식', value: data.inedibleFood === 'NONE' ? '없음' : data.inedibleFood },
			{ label: '하루 권장 식사량', value: `${data.amount}g` },
			{ label: '특이사항', value: data.inedibleFoodEtc === 'NONE' ? '없음' : data.inedibleFoodEtc},
			{ label: '예약결제 등급 할인', value: `${data.discountGrade.toLocaleString()}원` },
			{ label: '예약결제 쿠폰 할인', value: `${data.discountCoupon.toLocaleString()}원` },
			{ label: '예약결제 결제 원금', value: `${data.nextPaymentPrice.toLocaleString()}원` },
			{ label: '예약결제 결제 금액', value: `${calcPaymentPrice(data).toLocaleString()}원` },
			{ label: '예약결제 예약 일시', value: format(new Date(data.nextPaymentDate), 'yyyy-MM-dd HH:mm:ss') },
			{ label: '예약결제 배송 일자', value: format(new Date(data.nextDeliveryDate), 'yyyy-MM-dd') },
		];
	}

	if (!subscriptionList || subscriptionList.length < 1) return null;
	return (
		<div className={commonWrapper({ direction: 'col', gap: 16 })}>
			{subscriptionList.map((subscription, index) => (
				<DetailTable
					key={index}
					columns={2}
					title={index === 0 ? '구독 정보' : ''}
					items={subscriptionDetailInfo(subscription.data, subscription.recipeNames)}
				/>
			))}
		</div>
	);
}