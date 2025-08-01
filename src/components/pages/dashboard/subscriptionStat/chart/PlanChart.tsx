import CommonPieChart from "@/components/pages/dashboard/common/chart/pieChart/CommonPieChart";
import { SubscriberByPlan } from "@/types/dashboard";

interface PlanChartProps {
	planList: SubscriberByPlan[];
}

export default function PlanChart({
	planList
}: PlanChartProps) {
	const data = planList.map(item => ({ name: item.plan, value: item.count }));

	return (
		<CommonPieChart title='플랜별 현재 구독자 수' data={data} unit='명' />
	);
}