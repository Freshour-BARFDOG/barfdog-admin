import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getIngredientList } from "../products";

export function useGetIngredientList(
  queryOptions?: UseSuspenseQueryCustomOptions<string[]>
) {
  return useSuspenseQuery<string[]>({
    queryKey: [queryKeys.PRODUCTS.BASE, queryKeys.PRODUCTS.GET_INGREDIENT_LIST],
    queryFn: getIngredientList,
    ...queryOptions,
  });
}
