import * as styles from '../Chart.css';
import { commonWrapper } from "@/styles/common.css";
import { Legend } from "recharts";
import Text from "@/components/common/text/Text";

interface BarChartLegendProps {
	customOrder: string[];
	labelMap: Record<string, string>;
}

export default function BarChartLegend({
	customOrder,
	labelMap,
}: BarChartLegendProps) {
	return (
		<Legend
			content={({ payload }) => {
				if (!payload || !Array.isArray(payload)) return null;
				const sortedPayload = [...payload].sort(
					(a, b) =>
						customOrder.indexOf(a.dataKey as string) - customOrder.indexOf(b.dataKey as string)
				);
				return (
					<ul className={styles.chartLegend}>
						{sortedPayload?.map((entry, index) => {
							return (
								<li
									key={`item-${index}`}
									className={commonWrapper({ width: 'auto', align: 'center', gap: 4 })}
								>
		              <span
			              className={styles.legendColor}
			              style={{ backgroundColor: entry.color }}
		              />
									<Text type="body3">{labelMap[entry.dataKey]}</Text>
								</li>
							)
						})}
					</ul>
				)
			}}
		/>
	);
}