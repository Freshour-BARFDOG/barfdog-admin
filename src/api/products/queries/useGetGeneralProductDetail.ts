import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { GeneralProductDetailResponse } from "@/types/products";
import { getGeneralProductDetail } from "../products";

export function useGetGeneralProductDetail(
  itemId: number,
  queryOptions?: UseQueryCustomOptions<GeneralProductDetailResponse>
) {
  return useQuery<GeneralProductDetailResponse>({
    queryKey: [
      queryKeys.PRODUCTS.BASE,
      queryKeys.PRODUCTS.GET_GENERAL_PRODUCT_DETAIL,
      itemId,
    ],
    queryFn: () => getGeneralProductDetail(itemId),
    staleTime: 0,
    ...queryOptions,
  });
}
