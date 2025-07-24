import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { excelDownloadAllianceCoupon } from "@/api/alliance/alliance";
import { ExcelDownloadAllianceCoupon } from "@/types/alliance";

export function useExcelDownloadAllianceCoupon(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: ExcelDownloadAllianceCoupon) => excelDownloadAllianceCoupon(body),
		...mutationOptions,
	})
}
