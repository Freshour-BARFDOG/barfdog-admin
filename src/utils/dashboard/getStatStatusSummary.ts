interface StatusItem {
	[key: string]: any; // 일반 객체로 받아서 유연하게
	count: number;
}

export function getStatStatusSummary<T extends StatusItem>(
	data: T[],
	groupMap: Record<string, string[]>,
	statusKey: keyof T
) {
	return Object.entries(groupMap).map(([label, keys]) => {
		const total = data
			.filter((item) => keys.includes(item[statusKey]))
			.reduce((sum, item) => sum + item.count, 0);

		return {
			label,
			value: `${total} 건`,
		};
	});
}