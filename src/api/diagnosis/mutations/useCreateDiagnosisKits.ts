import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { createDiagnosisKits } from "../diagnosis";

export function useCreateDiagnosisKits(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDiagnosisKits,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.DIAGNOSIS.BASE, queryKeys.DIAGNOSIS.GET_KIT_LIST],
      });
    },
    ...mutationOptions,
  });
}
