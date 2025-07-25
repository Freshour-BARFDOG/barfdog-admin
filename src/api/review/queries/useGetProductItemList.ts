import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { SelectOption, UseQueryCustomOptions } from "@/types/common";
import { ProductItemType } from "@/types/review";
import { getProductItemList } from "@/api/review/review";

export function useGetProductItemList(
	type: ProductItemType,
	queryOptions?: UseQueryCustomOptions<SelectOption<number>[]>,
) {
	return useQuery<SelectOption<number>[]>({
		queryKey: [
			queryKeys.REVIEW.BASE,
			queryKeys.REVIEW.GET_PRODUCT_ITEM_LIST,
			type,
		],
		queryFn: () => getProductItemList(type),
		keepPreviousData: true,
		...queryOptions,
	});
}