import { UseMutationCustomOptions } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { excelDownloadDiagnosisKits } from "../diagnosis";
import { queryKeys } from "@/constants/queryKeys";

export function useExcelDownloadDiagnosisKits(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: excelDownloadDiagnosisKits,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.DIAGNOSIS.BASE, queryKeys.DIAGNOSIS.GET_KIT_LIST],
      });
    },
    ...mutationOptions,
  });
}
