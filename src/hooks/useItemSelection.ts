import { useCallback, useMemo, useState } from "react";

export default function useItemSelection<T>(
	items: T[],
	getId: (item: T) => string | number,
	initialSelectedIds: Array<string | number> = []
) {
	const allIds = useMemo(() => items?.map(getId), [items, getId]);

	const [selectedIds, setSelectedIds] = useState<(string | number)[]>(initialSelectedIds);

	const isSelected = useCallback(
		(id: string | number) => selectedIds.includes(id),
		[selectedIds]
	);

	const selectAll = useCallback(
		(checked: boolean) => {
			setSelectedIds(checked ? allIds : []);
		},
		[allIds]
	);

	const toggleSelect = useCallback(
		(id: string | number) => {
			setSelectedIds((prev) =>
				prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
			);
		},
		[]
	);

	const clearSelect = useCallback(() => {
		setSelectedIds([]);
	}, []);

	return {
		allIds,
		selectedIds,
		isSelected,
		selectAll,
		toggleSelect,
		clearSelect,
		allSelected: selectedIds?.length === allIds?.length && allIds?.length > 0,
	};
}
