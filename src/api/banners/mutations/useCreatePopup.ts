import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { PopupFormValues } from "@/types/banners";
import { submitBanner } from "@/api/banners/banners";

export function useCreatePopup(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ body, pcFile, mobileFile }: {
			body: PopupFormValues,
			pcFile: File | null,
			mobileFile: File | null,
		}) => await submitBanner('popup', body, pcFile, mobileFile),
		...mutationOptions,
	})
}
