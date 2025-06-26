export function getTableRowNumber({
	totalElements = 0,
	currentPage = 0,
	pageSize = 0,
	index = 0,
}: {
	totalElements: number;
	currentPage: number;
	pageSize: number;
	index: number;
}) {
	return totalElements - (currentPage * pageSize + index);
}
