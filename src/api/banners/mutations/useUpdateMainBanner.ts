import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { MainBannerFormValues } from "@/types/banners";
import { submitBanner} from "@/api/banners/banners";

export function useUpdateMainBanner(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ bannerId, body, pcFile, mobileFile }: {
			bannerId: number,
			body: MainBannerFormValues,
			pcFile: File | null,
			mobileFile: File | null,
		}) => await submitBanner('main', body, pcFile, mobileFile, bannerId),
		...mutationOptions,
	})
}
