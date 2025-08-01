import * as styles from "@/components/pages/dashboard/common/chart/Chart.css";
import { commonWrapper } from "@/styles/common.css";
import { Tooltip } from "recharts";
import Text from "@/components/common/text/Text";

interface BarChartTooltipProps {
	customOrder: string[];
	labelMap: Record<string, string>;
	unit?: string;
}

export default function BarChartTooltip({
	customOrder,
	labelMap,
	unit,
}: BarChartTooltipProps) {
	return (
		<Tooltip
			content={({ payload, label }) => {
				const sortedPayload = [...payload].sort(
					(a, b) =>
						customOrder.indexOf(a.dataKey as string) - customOrder.indexOf(b.dataKey as string)
				);

				return (
					<div className={styles.barChartTooltip}>
						<p style={{ marginBottom: 4 }}>{label}</p>
						{sortedPayload.map((entry, idx) => (
							<div key={idx} className={commonWrapper({ align: 'center', gap: 8, justify: 'start' })}>
								<span
									className={styles.legendColor}
									style={{ backgroundColor: entry.color }}
								/>
								<Text type='body3'>{labelMap[entry.dataKey]}</Text>
								<Text type='body3'>{entry.value} {unit && unit}</Text>
							</div>
						))}
					</div>
				);
			}}
		/>
	);
}