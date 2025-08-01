import { useMemo } from 'react';
import { themeVars } from "@/styles/theme.css";
import { legendColor } from "@/components/pages/dashboard/common/chart/Chart.css";
import { commonWrapper, fullWidth } from '@/styles/common.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Text from "@/components/common/text/Text";
import PieChartLabel from "@/components/pages/dashboard/common/chart/pieChart/PieChartLabel";
import PieChartLegend from "@/components/pages/dashboard/common/chart/pieChart/PieChartLegend";
import { CHART_COLORS } from "@/constants/dashboard";

interface PieChartData {
	name: string;
	value: number;
}

interface CommonPieChartProps {
	title?: string;
	data: PieChartData[];
	unit?: string;
}

function shuffleArray<T>(array: T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

export default function CommonPieChart({
	title,
	data,
	unit,
}: CommonPieChartProps) {
	const shuffledColors = useMemo(() => shuffleArray(CHART_COLORS), []);

	return (
		<div className={fullWidth}>
			{title && <Text type='headline1'>{title}</Text>}
			<ResponsiveContainer width="100%" height={450}>
				<PieChart>
					<Pie
						data={data}
						innerRadius={100}
						outerRadius={140}
						fill={themeVars.colors.chart.purple}
						paddingAngle={4}
						dataKey="value"
						labelLine={false}
						label={(props) => <PieChartLabel {...props} />}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${entry.name}`}
								fill={shuffledColors[index % shuffledColors.length]}
							/>
						))}
					</Pie>
					<Tooltip
						formatter={(value, name, item) => {
							return (
								<div className={commonWrapper({ align: 'center', gap: 8 })}>
									<span
										className={legendColor}
										style={{ backgroundColor: item.payload.fill }}
									/>
									<Text type="body3">
										{value}
										&nbsp;{unit && unit}
									</Text>
								</div>
							)
						}}
					/>
					<PieChartLegend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}