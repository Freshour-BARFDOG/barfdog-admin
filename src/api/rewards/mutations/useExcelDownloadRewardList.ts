import { useMutation } from "@tanstack/react-query";
import { excelDownloadRewardList } from "@/api/rewards/rewards";
import { UseMutationCustomOptions } from "@/types/common";
import { RewardListSearchParams } from "@/types/benefits/rewards";

export function useExcelDownloadRewardList(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (searchParams: RewardListSearchParams) => excelDownloadRewardList(searchParams),
		...mutationOptions,
	})
}
