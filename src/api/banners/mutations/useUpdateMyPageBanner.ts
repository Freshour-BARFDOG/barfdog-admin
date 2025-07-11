import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { MyPageBannerFormValues } from "@/types/banners";
import { updateMyPageBanner } from "@/api/banners/banners";

export function useUpdateMyPageBanner(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ bannerId, body, pcFile, mobileFile }: {
			bannerId: number,
			body: MyPageBannerFormValues,
			pcFile: File | null,
			mobileFile: File | null,
		}) => updateMyPageBanner(bannerId, body, pcFile, mobileFile),
		...mutationOptions,
	})
}
