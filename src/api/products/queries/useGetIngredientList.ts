import { queryKeys } from "@/constants/queryKeys";
import { UseQueryCustomOptions } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { getIngredientList } from "../products";

export function useGetIngredientList(
  queryOptions?: UseQueryCustomOptions<string[]>
) {
  return useQuery<string[]>({
    queryKey: [queryKeys.PRODUCTS.BASE, queryKeys.PRODUCTS.GET_INGREDIENT_LIST],
    queryFn: getIngredientList,
    ...queryOptions,
  });
}
