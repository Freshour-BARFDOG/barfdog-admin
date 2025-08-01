import { format } from "date-fns";
import CommonBarChart from "@/components/pages/dashboard/common/chart/barChart/CommonBarChart";
import StatListLayout from "@/components/pages/dashboard/common/statList/StatListLayout";
import StatTooltip from "@/components/pages/dashboard/common/statList/StatTooltip";
import { OrderCountByDate } from "@/types/dashboard";
import { BAR_CHART_COLOR, ORDER_COUNT_LABEL } from "@/constants/dashboard";

interface OrderCountStatProps {
	data: OrderCountByDate[];
}

export default function OrderCountStat({
	data,
}: OrderCountStatProps) {
	const orderCountByDateList = data.map(item => ({
		name: format(new Date(item.date), 'yyyy-MM-dd'),
		newSubscribeCount: item.newSubscribeCount,
		totalSubscribeCount: item.totalSubscribeCount,
		generalOrderCount: item.generalOrderCount,
	}))
	const customOrder = ['generalOrderCount', 'newSubscribeCount', 'totalSubscribeCount'];

	return (
		<StatListLayout title={<StatTooltip title='주문량' />}>
			<CommonBarChart
				data={orderCountByDateList}
				dataKeyX='name'
				bars={[
					{
						dataKey: 'generalOrderCount',
						name: '일반 결제',
						color: BAR_CHART_COLOR.first,
					},
					{
						dataKey: 'newSubscribeCount',
						name: '신규 구독 결제',
						color: BAR_CHART_COLOR.second,
					},
					{
						dataKey: 'totalSubscribeCount',
						name: '총 구독 결제',
						color: BAR_CHART_COLOR.third,
					},
				]}
				labelMap={ORDER_COUNT_LABEL}
				customOrder={customOrder as Array<"name" | "generalOrderCount" | "newSubscribeCount" | "totalSubscribeCount">}
				unit='건'
				showBrush
			/>
		</StatListLayout>
	);
}