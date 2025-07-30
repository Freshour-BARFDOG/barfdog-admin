import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { RecipeRequest } from "@/types/products";
import { updateRecipe } from "../products";
import { queryKeys } from "@/constants/queryKeys";

export function useUpdateRecipe(
  recipeId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      recipeId,
      body,
      recipeFile,
      surveyFile,
    }: {
      recipeId: number;
      body: RecipeRequest;
      recipeFile: File | null;
      surveyFile: File | null;
    }) => updateRecipe({ recipeId, body, recipeFile, surveyFile }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.PRODUCTS.BASE, queryKeys.PRODUCTS.GET_RECIPE_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.PRODUCTS.BASE,
          queryKeys.PRODUCTS.GET_RECIPE_DETAIL,
          recipeId,
        ],
      });
    },
    ...mutationOptions,
  });
}
