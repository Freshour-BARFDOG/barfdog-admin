import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { RecipeDetailResponse } from "@/types/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecipeDetail } from "../products";

export function useGetRecipeDetail(
  recipeId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<RecipeDetailResponse>
) {
  return useSuspenseQuery<RecipeDetailResponse>({
    queryKey: [
      queryKeys.PRODUCTS.BASE,
      queryKeys.PRODUCTS.GET_RECIPE_DETAIL,
      recipeId,
    ],
    queryFn: () => getRecipeDetail(recipeId),
    ...queryOptions,
  });
}
