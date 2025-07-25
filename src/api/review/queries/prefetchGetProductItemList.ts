import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { ProductItem, ProductItemType } from "@/types/review";
import { getProductItemList  } from "@/api/review/review";

export async function prefetchGetProductItemList(type: ProductItemType, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<ProductItem[]>({
		queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_PRODUCT_ITEM_LIST, type],
		queryFn: () => getProductItemList(type, ssrAxios as AxiosInstance),
	})
}