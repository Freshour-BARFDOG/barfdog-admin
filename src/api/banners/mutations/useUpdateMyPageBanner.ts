import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { MyPageBannerFormValues } from "@/types/banners";
import { submitBanner } from "@/api/banners/banners";

export function useUpdateMyPageBanner(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ bannerId, body, pcFile, mobileFile }: {
			bannerId: number,
			body: MyPageBannerFormValues,
			pcFile: File | null,
			mobileFile: File | null,
		}) => await submitBanner('myPage', body, pcFile, mobileFile, bannerId),
		...mutationOptions,
	})
}
