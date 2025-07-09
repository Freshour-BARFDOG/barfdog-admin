export const formatNumberWithComma = (value: number | string): string =>
	value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const unformatCommaNumber = (value: string): number =>
	Number(value.replace(/,/g, ''));