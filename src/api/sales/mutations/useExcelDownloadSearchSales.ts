import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { excelDownloadSearchSales } from "../sales";
import { SearchSalesRequest } from "@/types/sales";

export function useExcelDownloadSearchSales(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (body: SearchSalesRequest) => excelDownloadSearchSales(body),
    ...mutationOptions,
  });
}
