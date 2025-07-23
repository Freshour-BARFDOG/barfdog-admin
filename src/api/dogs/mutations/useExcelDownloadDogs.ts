import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { excelDownloadDogs } from "../dogs";
import { DogListRequest } from "@/types/dog";

export function useExcelDownloadDogs(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (body: DogListRequest) => excelDownloadDogs(body),
    ...mutationOptions,
  });
}
