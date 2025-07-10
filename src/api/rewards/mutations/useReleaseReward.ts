import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { releaseReward } from "@/api/rewards/rewards";
import { ReleaseRewardRequestBody, RewardTarget } from "@/types/benefits/rewards";

export function useReleaseReward(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ rewardTarget, body }: {
			rewardTarget: RewardTarget,
			body: ReleaseRewardRequestBody
		}) => releaseReward(rewardTarget, body),
		...mutationOptions,
	})
}
