import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { RecipeListResponse } from "@/types/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecipeList } from "../products";

export function useGetRecipeList(
  queryOptions?: UseSuspenseQueryCustomOptions<RecipeListResponse>
) {
  return useSuspenseQuery<RecipeListResponse>({
    queryKey: [queryKeys.PRODUCTS.BASE, queryKeys.PRODUCTS.GET_RECIPE_LIST],
    queryFn: getRecipeList,
    ...queryOptions,
  });
}
