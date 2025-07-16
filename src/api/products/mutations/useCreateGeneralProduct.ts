import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/queryKeys";
import { createGeneralProduct } from "../products";

export function useCreateGeneralProduct(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGeneralProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.PRODUCTS.BASE,
          queryKeys.PRODUCTS.GET_GENERAL_PRODUCT_LIST,
        ],
      });
    },
    ...mutationOptions,
  });
}
