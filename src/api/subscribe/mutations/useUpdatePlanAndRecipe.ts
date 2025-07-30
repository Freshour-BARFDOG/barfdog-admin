import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { updatePlanAndRecipe } from "../subscribe";

export function useUpdatePlanAndRecipe(
  subscribeId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlanAndRecipe,
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
