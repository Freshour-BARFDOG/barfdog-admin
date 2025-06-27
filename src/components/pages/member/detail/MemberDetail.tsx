'use client';
import * as styles from './MemberDetail.css';
import DefaultInfo from "@/components/pages/member/detail/defaultInfo/DefaultInfo";
import OrderStatusInfo from "@/components/pages/member/detail/orderStatusInfo/OrderStatusInfo";
import LoginInfo from "@/components/pages/member/detail/loginInfo/LoginInfo";
import SubscriptionInfo from "@/components/pages/member/detail/subscriptionInfo/SubscriptionInfo";
import { useGetMemberDetail } from "@/api/member/queries/useGetMemberDetail";

interface MemberDetailProps {
	memberId: number;
}

export default function MemberDetail({ memberId }: MemberDetailProps) {
	const { data } = useGetMemberDetail(memberId);
	const { memberDto: detail, dogNames } = data;

	if (!data) return null;
	return (
		<>
		<div className={styles.detailInfoList}>
			<DefaultInfo
				memberId={memberId}
				data={{
					name: detail.name,
					email: detail.email,
					phoneNumber: detail.phoneNumber,
					birthday: detail.birthday,
					address: detail.address,
				}}
			/>
			<OrderStatusInfo
				memberId={memberId}
				data={{
					accumulatedAmount: detail.accumulatedAmount,
					accumulatedSubscribe: detail.accumulatedSubscribe,
					grade: detail.grade,
					subscribe: detail.subscribe,
					dogNames: dogNames,
					alliance: detail.alliance,
				}}
			/>
			<LoginInfo
				data={{
					longUnconnected: detail.longUnconnected,
					lastLoginDate: detail.lastLoginDate,
					withdrawal: detail.withdrawal,
				}}
			/>
			<SubscriptionInfo memberId={memberId} />
		</div>
		</>
	);
}