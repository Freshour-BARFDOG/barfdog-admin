import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { updateGeneralProduct } from "../products";

export function useUpdateGeneralProduct(
  itemId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGeneralProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.PRODUCTS.BASE,
          queryKeys.PRODUCTS.GET_GENERAL_PRODUCT_LIST,
        ],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.PRODUCTS.BASE,
          queryKeys.PRODUCTS.GET_GENERAL_PRODUCT_DETAIL,
          itemId,
        ],
      });
    },
    ...mutationOptions,
  });
}
