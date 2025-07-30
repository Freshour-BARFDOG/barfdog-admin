import { fullWidth } from "@/styles/common.css";
import CancelReasonChart from "@/components/pages/dashboard/subscriptionStat/chart/CancelReasonChart";
import PlanChart from "@/components/pages/dashboard/subscriptionStat/chart/PlanChart";
import RecipeChart from "@/components/pages/dashboard/subscriptionStat/chart/RecipeChart";
import Divider from "@/components/common/divider/Divider";
import SumGramChart from "@/components/pages/dashboard/subscriptionStat/chart/SumGramChart";
import StatListLayout from "@/components/pages/dashboard/common/statList/StatListLayout";
import StatRow from "@/components/pages/dashboard/common/statList/StatRow";
import StatItem from "@/components/pages/dashboard/common/statList/StatItem";
import { Subscription } from "@/types/dashboard";
import { getStatStatusSummary } from "@/utils/dashboard/getStatStatusSummary";

interface SubscriptionStatProps {
	data: Subscription;
}

const SUBSCRIPTION_GROUND_MAP = {
	'설문 완료': ['SURVEY_COMPLETED'],
	'구독 전': ['BEFORE_PAYMENT'],
	'구독 중': ['SUBSCRIBING'],
	'구독 보류': ['SUBSCRIBE_PENDING'],
	'구독 취소 예정': ['SUBSCRIBE_WILL_CANCEL'],
	'구독 취소': ['SUBSCRIBE_CANCEL'],
} as const;

export default function SubscriptionStat({
	data
}: SubscriptionStatProps) {
	const items = getStatStatusSummary(data.subscribeStatusList, SUBSCRIPTION_GROUND_MAP as unknown as Record<string, string[]>, 'subscribeStatus');

	return (
		<div className={fullWidth}>
			<StatListLayout title="구독 현황">
				<StatRow columns={3}>
					<StatItem
						items={[
							{ label: '구독 수', value: `${data.totalSubscribeCount} 건`, },
							{ label: '구독자 수', value: `${data.totalSubscriberCount} 명`, },
							{ label: '신규 구독 주문 수', value: `${data.newSubscribeCount} 건`, },
							{ label: '취소한 구 주 수', value: `${data.subscribeCancelCount} 건`, },
						]}
					/>
					<StatItem
						items={[
							{ label: '총 매출액', value: `${data.totalSubscribeSales.toLocaleString()} 원`, },
							{ label: '전체 구독 평균 결제액', value: `${Number(data.avgPaymentPrice.toFixed(0)).toLocaleString()} 원`, },
						]}
					/>
					<StatItem
						items={items}
					/>
				</StatRow>
				<Divider thickness={1} color='gray300' />
				<StatRow columns={2}>
					<CancelReasonChart cancelReasonList={data.subscribeCancelReasonList} />
					<PlanChart planList={data.subscriberByPlanList} />
				</StatRow>
				<Divider thickness={1} color='gray300' />
				<StatRow columns={2}>
					<RecipeChart recipeList={data.subscriberByRecipeList} />
					<SumGramChart gramList={data.subscribeSumGramByRecipeList} />
				</StatRow>
			</StatListLayout>
		</div>
	);
}