import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { GetRecipeListResponse } from "@/types/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecipeList } from "../products";

export function useGetRecipeList(
  queryOptions?: UseSuspenseQueryCustomOptions<GetRecipeListResponse>
) {
  return useSuspenseQuery<GetRecipeListResponse>({
    queryKey: [queryKeys.PRODUCTS.BASE, queryKeys.PRODUCTS.GET_RECIPE_LIST],
    queryFn: getRecipeList,
    ...queryOptions,
  });
}
