import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { RecipeRequest } from "@/types/products";
import { createRecipe } from "../products";
import { queryKeys } from "@/constants/queryKeys";

export function useCreateRecipe(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      body,
      recipeFile,
      surveyFile,
    }: {
      body: RecipeRequest;
      recipeFile: File | null;
      surveyFile: File | null;
    }) => createRecipe({ body, recipeFile, surveyFile }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.PRODUCTS.BASE, queryKeys.PRODUCTS.GET_RECIPE_LIST],
      });
    },
    ...mutationOptions,
  });
}
