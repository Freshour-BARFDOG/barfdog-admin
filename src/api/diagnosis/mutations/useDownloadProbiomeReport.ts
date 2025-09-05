import { useMutation } from "@tanstack/react-query";
import type { UseMutationCustomOptions } from "@/types/common";
import { downloadProbiomeReportByUrl } from "../diagnosis";

export function useDownloadProbiomeReport(
  mutationOptions?: UseMutationCustomOptions<Blob>
) {
  return useMutation({
    mutationFn: (reportUrl: string) => downloadProbiomeReportByUrl(reportUrl),
    ...mutationOptions,
  });
}
