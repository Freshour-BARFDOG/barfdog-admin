import { format } from "date-fns";
import CommonBarChart from "@/components/pages/dashboard/common/chart/barChart/CommonBarChart";
import StatListLayout from "@/components/pages/dashboard/common/statList/StatListLayout";
import StatLabel from "@/components/pages/dashboard/common/statList/StatLabel";
import StatTooltip from "@/components/pages/dashboard/common/statList/StatTooltip";
import StatTopInfo from "@/components/pages/dashboard/common/statList/StatTopInfo";
import DividerVertical from "@/components/common/dividerVertical/DividerVertical";
import { SalesCountByDate } from "@/types/dashboard";
import { BAR_CHART_COLOR, SALES_COUNT_LABEL } from "@/constants/dashboard";

interface SalesCountStatProps {
	salesCountList: SalesCountByDate[];
	totalSales: number;
	totalGeneralOrderSales: number;
	totalSubscribeSales: number;
}

export default function SalesCountStat({
	salesCountList,
	totalSales,
	totalGeneralOrderSales,
	totalSubscribeSales,
}: SalesCountStatProps) {
	const salesCountByDateList = salesCountList.map(item => ({
		name: format(new Date(item.date), 'yyyy-MM-dd'),
		generalOrderSalesCount: item.generalOrderSalesCount.toLocaleString(),
		subscribeSalesCount: item.subscribeSalesCount.toLocaleString(),
		totalSalesCount: item.totalSalesCount.toLocaleString(),
	}))
	const customOrder = ['generalOrderSalesCount', 'subscribeSalesCount'];

	return (
		<StatListLayout title={<StatTooltip title='매출액' />}>
			<StatTopInfo
				leftChildren={(
					<>
						<StatLabel label='전체' value={totalSales.toLocaleString()} unit='원' />
						<DividerVertical thickness={1} color='gray200' />
						<StatLabel label='일반' value={totalGeneralOrderSales.toLocaleString()} unit='원' />
						<DividerVertical thickness={1} color='gray200' />
						<StatLabel label='구독' value={totalSubscribeSales.toLocaleString()} unit='원' />
					</>
				)}
			/>
			<CommonBarChart
				data={salesCountByDateList}
				dataKeyX='name'
				dataKeyLine='totalSalesCount'
				bars={[
					{
						dataKey: 'generalOrderSalesCount',
						name: SALES_COUNT_LABEL.generalOrderSalesCount,
						color: BAR_CHART_COLOR.first,
					},
					{
						dataKey: 'subscribeSalesCount',
						name: SALES_COUNT_LABEL.subscribeSalesCount,
						color: BAR_CHART_COLOR.second,
					},
				]}
				labelMap={SALES_COUNT_LABEL}
				customOrder={customOrder as ("generalOrderSalesCount" | "subscribeSalesCount")[]}
				unit='원'
				showBrush
			/>
		</StatListLayout>
	);
}