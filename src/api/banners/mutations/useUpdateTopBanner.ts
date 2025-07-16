import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { TopBannerFormValues } from "@/types/banners";
import { updateTopBanner } from "@/api/banners/banners";

export function useUpdateTopBanner(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ bannerId, body }: {
			bannerId: number,
			body: TopBannerFormValues,
		}) => updateTopBanner(bannerId, body),
		...mutationOptions,
	})
}
