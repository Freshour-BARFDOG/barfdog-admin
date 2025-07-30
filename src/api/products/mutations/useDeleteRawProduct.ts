import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { deleteRawProduct } from "../products";

export function useDeleteRawProduct(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRawProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.PRODUCTS.BASE, queryKeys.PRODUCTS.GET_RECIPE_LIST],
      });
    },
    ...mutationOptions,
  });
}
