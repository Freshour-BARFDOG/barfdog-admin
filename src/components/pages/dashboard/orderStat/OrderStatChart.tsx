import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import PieChartLegend from "@/components/pages/dashboard/common/chart/pieChart/PieChartLegend";
import PieChartLabel from "@/components/pages/dashboard/common/chart/pieChart/PieChartLabel";
import { useGetRecipeList } from "@/api/products/queries/useGetRecipeList";
import { SalesByRecipe } from "@/types/dashboard";
import { CHART_COLORS } from "@/constants/dashboard";
import { filterAndAggregate } from "@/utils/dashboard/filterAndAggregate";

interface OrderStatChartProps {
	data: SalesByRecipe[];
}

export default function OrderStatChart({
	data,
}: OrderStatChartProps) {
	const { data: recipeList } = useGetRecipeList();

	const chartData = filterAndAggregate(data, recipeList, "sales")

	// value === 0 인 항목 중 첫 번째만 보이도록 index 기억
	const zeroIndices = chartData
		.map((item, idx) => (item.value === 0 ? idx : -1))
		.filter((idx) => idx !== -1);
	const firstZeroIndex = zeroIndices[0];

	return (
		<ResponsiveContainer width="100%" height={400}>
			<PieChart>
				<Pie
					data={chartData}
					dataKey="value"
					nameKey="name"
					outerRadius={120}
					labelLine={false}
					label={(props) => {
						const { value, index, percent } = props;
						const isZero = value === 0;
						const isFirstZero = index === firstZeroIndex;
						if (isZero && !isFirstZero) return null;
						return (
							<PieChartLabel
								{...props}
								labelText={`${value?.toLocaleString()}원 (${(Math.round(percent! * 100))}%)`}
							/>
						)
					}}
				>
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
					))}
				</Pie>
				<Tooltip formatter={(value: number) => `${value.toLocaleString()} 원`} />
				<PieChartLegend />
			</PieChart>
		</ResponsiveContainer>
	);
}
