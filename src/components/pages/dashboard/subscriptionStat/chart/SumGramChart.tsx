import CommonPieChart from "@/components/pages/dashboard/common/chart/pieChart/CommonPieChart";
import { SubscribeSumGramByRecipe } from "@/types/dashboard";
import { useGetRecipeList } from "@/api/products/queries/useGetRecipeList";
import { filterAndAggregate } from "@/utils/dashboard/filterAndAggregate";

interface SumGramChartProps {
	gramList: SubscribeSumGramByRecipe[];
}

export default function SumGramChart({
	gramList
}: SumGramChartProps) {
	const { data: recipeList } = useGetRecipeList();
	const chartData = filterAndAggregate(gramList, recipeList, "sum")

	return (
		<CommonPieChart title='구독자 레시피별 한 끼 무게 총합' data={chartData} unit='g' />
	);
}