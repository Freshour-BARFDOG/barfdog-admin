import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProbiomeReport } from "../diagnosis";
import { queryKeys } from "@/constants/queryKeys";

export const useUploadProbiomeReport = (diagnosisId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pdfFile: File) =>
      uploadProbiomeReport({ diagnosisId, pdfFile }),
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
  });
};
