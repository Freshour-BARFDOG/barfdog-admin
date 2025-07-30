import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { updateNextPaymentDate } from "../subscribe";

export function useUpdateNextPaymentDate(
  subscribeId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNextPaymentDate,
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
