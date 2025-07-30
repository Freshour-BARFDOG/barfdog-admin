type RecipeStatItem = {
	recipeName: string;
	[key: string]: any;
};

export function filterAndAggregate<T extends RecipeStatItem>(
	data: T[],
	recipeList: { name: string }[],
	valueKey: keyof T
) {
	const validNameSet = new Set(recipeList.map(r => r.name));
	const recipeCountMap = new Map<string, number>();

	data.forEach(item => {
		if (!validNameSet.has(item.recipeName)) return;

		const count = Number(item[valueKey]) || 0;
		item.recipeName.split(',').map(n => n.trim()).forEach(name => {
			recipeCountMap.set(name, (recipeCountMap.get(name) || 0) + count);
		});
	});

	return Array.from(recipeCountMap.entries()).map(([name, value]) => ({
		name,
		value: Math.round(value),
	}));
}