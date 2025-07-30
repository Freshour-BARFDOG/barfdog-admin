import CommonPieChart from "@/components/pages/dashboard/common/chart/pieChart/CommonPieChart";
import { SubscribeCancelReason } from "@/types/dashboard";

interface CancelReasonChartProps {
	cancelReasonList: SubscribeCancelReason[];
}

export default function CancelReasonChart({
	cancelReasonList
}: CancelReasonChartProps) {
	const reasonList = cancelReasonList.map(reason => ({ name: reason.reason, value: reason.count }));

	return (
		<CommonPieChart title='구독 취소 사유' data={reasonList} unit='건' />
	);
}