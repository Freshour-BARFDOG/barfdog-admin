import CommonPieChart from "@/components/pages/dashboard/common/chart/pieChart/CommonPieChart";
import { SubscriberByRecipe } from "@/types/dashboard";

interface RecipeChartProps {
	recipeList: SubscriberByRecipe[];
}

function getRecipeSubscriberCount(data: SubscriberByRecipe[]) {
	const recipeCountMap = new Map<string, number>();

	data.forEach(({ recipeName, count }) => {
		recipeName.split(',').map(name => name.trim()).forEach(name => {
			recipeCountMap.set(name, (recipeCountMap.get(name) || 0) + count);
		});
	});

	return Array.from(recipeCountMap.entries()).map(([name, value]) => ({
		name,
		value,
	}));
}

export default function RecipeChart({
	recipeList
}: RecipeChartProps) {
	const data = getRecipeSubscriberCount(recipeList);

	return (
		<CommonPieChart title='레시피별 현재 구독자 수' data={data} unit='명' />
	);
}