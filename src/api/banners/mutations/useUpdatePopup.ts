import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { PopupFormValues } from "@/types/banners";
import { submitBanner } from "@/api/banners/banners";

export function useUpdatePopup(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ popupId, body, pcFile, mobileFile }: {
			popupId: number,
			body: PopupFormValues,
			pcFile: File | null,
			mobileFile: File | null,
		}) => submitBanner('popup', body, pcFile, mobileFile, popupId),
		...mutationOptions,
	})
}
