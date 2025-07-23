import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { updateNextPaymentPrice } from "../subscribe";

export function useUpdateNextPaymentPrice(
  subscribeId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNextPaymentPrice,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.SUBSCRIBE.BASE,
          queryKeys.SUBSCRIBE.GET_SUBSCRIBE_DETAIL,
          subscribeId,
        ],
      });
    },
    ...mutationOptions,
  });
}
