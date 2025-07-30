import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getMemberList } from "@/api/member/member";
import { UseQueryCustomOptions } from "@/types/common";
import {
  GeneralProductListParams,
  GeneralProductListResponse,
} from "@/types/products";
import { getGeneralProductList } from "../products";

export function useGetGeneralProductList(
  params: GeneralProductListParams,
  queryOptions?: UseQueryCustomOptions<GeneralProductListResponse>
) {
  return useQuery<GeneralProductListResponse>({
    queryKey: [
      queryKeys.PRODUCTS.BASE,
      queryKeys.PRODUCTS.GET_GENERAL_PRODUCT_LIST,
      params,
    ],
    queryFn: () => getGeneralProductList(params),
    keepPreviousData: true,
    ...queryOptions,
  });
}
