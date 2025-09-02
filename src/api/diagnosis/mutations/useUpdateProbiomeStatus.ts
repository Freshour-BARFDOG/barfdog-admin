import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { updateProbiomeStatus } from "../diagnosis";

export function useUpdateProbiomeStatus(
  diagnosisId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProbiomeStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.DIAGNOSIS.BASE,
          queryKeys.DIAGNOSIS.GET_PROBIOME_DETAIL,
          diagnosisId,
        ],
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.DIAGNOSIS.BASE, queryKeys.DIAGNOSIS.GET_LIST],
      });
    },
    ...mutationOptions,
  });
}
