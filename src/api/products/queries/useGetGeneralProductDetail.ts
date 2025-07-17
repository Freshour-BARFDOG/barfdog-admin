import { queryKeys } from "@/constants/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { GeneralProductDetailResponse } from "@/types/products";
import { getGeneralProductDetail } from "../products";

export function useGetGeneralProductDetail(
  itemId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<GeneralProductDetailResponse>
) {
  return useSuspenseQuery<GeneralProductDetailResponse>({
    queryKey: [
      queryKeys.PRODUCTS.BASE,
      queryKeys.PRODUCTS.GET_GENERAL_PRODUCT_DETAIL,
      itemId,
    ],
    queryFn: () => getGeneralProductDetail(itemId),
    ...queryOptions,
  });
}
