import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import OrderStatChart from "@/components/pages/dashboard/orderStat/OrderStatChart";
import StatListLayout from "@/components/pages/dashboard/common/statList/StatListLayout";
import StatRow from "@/components/pages/dashboard/common/statList/StatRow";
import StatItem from "@/components/pages/dashboard/common/statList/StatItem";
import { OrderStatusStat, SalesByRecipe } from "@/types/dashboard";
import { getStatStatusSummary } from "@/utils/dashboard/getStatStatusSummary";

interface OrderStatProps {
	totalOrderCount: number;
	totalSales: number;
	orderStatusList: OrderStatusStat[];
	salesByRecipeList: SalesByRecipe[];
}

const ORDER_GROUND_MAP = {
	'결제 완료': ['PAYMENT_DONE'],
	'주문 확인': ['DELIVERY_READY', 'PRODUCING'],
	'구매 확정': ['CONFIRM'],
	'결제 실패': ['FAILED'],
	'예약 결제 실패': ['FAILED_RESERVED_PAYMENT'],
} as const;

export default function OrderStat({
	totalOrderCount,
	totalSales,
	orderStatusList,
	salesByRecipeList,
}: OrderStatProps) {
	const items = getStatStatusSummary(
		orderStatusList,
		ORDER_GROUND_MAP as unknown as Record<string, string[]>,
		'orderStatus'
	);
	return (
		<StatListLayout title='주문 현황' width='lg'>
			<StatRow columns={2} layoutRatio='wideLeft'>
				<StatItem
					items={[
						{ label: '총 주문 수', value: `${totalOrderCount} 건`, },
						{ label: '총 매출 액', value: `${totalSales.toLocaleString()} 건`, },
						{ value: (
								<div className={commonWrapper({ direction: 'col', align: 'center', justify: 'center' })}>
									<Text type='label2'>레시피별 매출</Text>
									{salesByRecipeList.every(recipe => recipe.sales === 0)
										? <Text type='body3' color='gray500'>기간 내 매출이 없습니다.</Text>
										: (
											<OrderStatChart
												data={
													salesByRecipeList
														.sort((a, b) => b.sales - a.sales)
												}
											/>
										)
									}
								</div>
							)
						}
					]}
				/>
				<StatItem items={items} />
			</StatRow>
		</StatListLayout>
	);
}