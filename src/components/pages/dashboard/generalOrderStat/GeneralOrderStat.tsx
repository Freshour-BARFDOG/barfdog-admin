import StatListLayout from "@/components/pages/dashboard/common/statList/StatListLayout";
import StatRow from "@/components/pages/dashboard/common/statList/StatRow";
import StatItem from "@/components/pages/dashboard/common/statList/StatItem";
import { GeneralOrder } from "@/types/dashboard";
import { getStatStatusSummary } from "@/utils/dashboard/getStatStatusSummary";

interface GeneralOrderStatProps {
	data: GeneralOrder;
}

const GENERAL_ORDER_GROUND_MAP = {
	'구매 확정': ['CONFIRM'],
	'취소 요청': ['CANCEL_REQUEST'],
	'취소 완료': ['CANCEL_PAYMENT', 'CANCEL_DONE_BUYER', 'CANCEL_DONE_SELLER'],
	'반품 요청': ['RETURN_REQUEST'],
	'반품 완료': ['RETURN_DONE_BUYER', 'RETURN_DONE_SELLER'],
	'교환 요청': ['EXCHANGE_REQUEST'],
	'교환 완료': ['EXCHANGE_DONE_BUYER', 'EXCHANGE_DONE_SELLER'],
} as const;

export default function GeneralOrderStat({
	data,
}: GeneralOrderStatProps) {
	const items = getStatStatusSummary(
		data?.generalOrderStatusList,
		GENERAL_ORDER_GROUND_MAP as unknown as Record<string, string[]>,
		'generalOrderStatus'
	);
	return (
		<StatListLayout title='일반 구매 현황' width='lg'>
			<StatRow columns={2}>
				<StatItem
					items={[
						{ label: '신규 주문 수', value: `${data.newGeneralOrderCount} 건` },
						{ label: '총 매출액', value: `${data.totalGeneralOrderSales.toLocaleString()} 원` },
					]}
				/>
				<StatItem items={items}/>
			</StatRow>
		</StatListLayout>
	);
}