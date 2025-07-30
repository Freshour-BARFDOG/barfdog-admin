import StatListLayout from "@/components/pages/dashboard/common/statList/StatListLayout";
import StatRow from "@/components/pages/dashboard/common/statList/StatRow";
import StatItem from "@/components/pages/dashboard/common/statList/StatItem";
import { DeliveryStatusStat } from "@/types/dashboard";
import { DELIVERY_STATUS } from "@/constants/dashboard";

interface DeliveryStatProps {
	data: DeliveryStatusStat[];
}

export default function DeliveryStat({
	data,
}: DeliveryStatProps) {
	const items = data
		.filter(item => Object.prototype.hasOwnProperty.call(DELIVERY_STATUS, item.deliveryStatus))
		.map(item => ({
			label: DELIVERY_STATUS[item.deliveryStatus as keyof typeof DELIVERY_STATUS],
			value: `${item.count} 건`
		}));
	return (
		<StatListLayout title='배송 상태 현황' width='sm'>
			<StatRow columns={1}>
				<StatItem items={items} />
			</StatRow>
		</StatListLayout>
	);
}