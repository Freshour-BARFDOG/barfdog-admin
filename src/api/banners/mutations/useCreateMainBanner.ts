import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { MainBannerFormValues } from "@/types/banners";
import { submitMainBanner } from "@/api/banners/banners";

export function useCreateMainBanner(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ body, pcFile, mobileFile }: {
			body: MainBannerFormValues,
			pcFile: File | null,
			mobileFile: File | null,
		}) => submitMainBanner(body, pcFile, mobileFile),
		...mutationOptions,
	})
}
