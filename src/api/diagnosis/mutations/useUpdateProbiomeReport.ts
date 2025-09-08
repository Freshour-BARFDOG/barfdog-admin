import { useMutation } from "@tanstack/react-query";
import { updateProbiomeReport } from "../diagnosis";

export const useUpdateProbiomeReport = (diagnosisId: number) => {
  return useMutation({
    mutationFn: (pdfFile: File) =>
      updateProbiomeReport({ diagnosisId, pdfFile }),
  });
};
