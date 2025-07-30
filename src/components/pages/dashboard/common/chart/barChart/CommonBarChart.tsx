import { useMemo } from "react";
import { themeVars } from "@/styles/theme.css";
import { Bar, Brush, CartesianGrid, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import BarChartTooltip from "@/components/pages/dashboard/common/chart/barChart/BarChartTooltip";
import BarChartLegend from "@/components/pages/dashboard/common/chart/barChart/BarChartLegend";
import { DataKey } from "recharts/types/util/types";

interface BarChartConfig<T> {
	dataKey: keyof T;
	name: string;
	color: string;
}

interface BarChartProps<T extends Record<string, any>> {
	data: T[];
	dataKeyX: keyof T;
	dataKeyLine?: keyof T;
	bars: BarChartConfig<T>[];
	labelMap?: Partial<Record<keyof T, string>>;
	customOrder?: (keyof T)[];
	unit?: string;
	height?: number;
	showBrush?: boolean;
}

export default function CommonBarChart<T extends Record<string, any>>({
	data,
	dataKeyX,
	dataKeyLine,
	bars,
	labelMap,
	customOrder,
	unit = '',
	height = 400,
	showBrush = false,
}: BarChartProps<T>) {

	const maxY = useMemo(() => {
		return Math.max(
			...data.flatMap((d) =>
				bars.map((bar) => Number(d[bar.dataKey] ?? 0))
			)
		);
	}, [data, bars]);

	const allowDecimals = maxY <= 1;
	const tickFormatter = useMemo(() => {
		return (value: number) =>
			allowDecimals ? value.toFixed(1) : value.toLocaleString();
	}, [allowDecimals]);

	return (
		<ResponsiveContainer width="100%" height={height}>
			<ComposedChart data={data}>
				<CartesianGrid stroke={themeVars.colors.gray.gray100} />
				<XAxis dataKey={dataKeyX as DataKey<T>} scale="auto" />
				<YAxis
					domain={[0, 'auto']}
					allowDecimals={allowDecimals}
					tickFormatter={tickFormatter}
				/>

				<BarChartTooltip customOrder={customOrder as string[]} labelMap={labelMap as Record<string, string>} unit={unit} />
				<BarChartLegend customOrder={customOrder as string[]} labelMap={labelMap as Record<string, string>} />
				{bars.map(bar => (
					<Bar
						key={String(bar.dataKey)}
						dataKey={bar.dataKey as string}
						barSize={20}
						fill={bar.color}
						name={bar.name}
					/>
				))}
				{dataKeyLine &&
          <Line type="monotone" dataKey={dataKeyLine as DataKey<T>} stroke={themeVars.colors.chart.red} />
				}
				{showBrush &&
					<Brush dataKey={dataKeyX as DataKey<T>} height={30} stroke={themeVars.colors.chart.purple} />
				}
			</ComposedChart>
		</ResponsiveContainer>
	);
}