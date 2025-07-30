import * as styles from '../Chart.css';
import { commonWrapper } from "@/styles/common.css";
import { Legend } from "recharts";
import Text from "@/components/common/text/Text";

export default function PieChartLegend() {
	return (
		<Legend
			iconType="circle"
			content={({ payload }) => (
				<ul className={styles.chartLegend}>
					{payload?.map((entry, index) => (
						<li
							key={`item-${index}`}
							className={commonWrapper({ width: 'auto', align: 'center', gap: 4 })}
						>
              <span
                className={`${styles.legendColor} ${styles.legendColorCircle}`}
                style={{ backgroundColor: entry.color }}
              />
							<Text type="body3">{entry.value}</Text>
						</li>
					))}
				</ul>
			)}
		/>
	);
}