import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteBanner } from "@/api/banners/banners";

export function useDeletePopup(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ popupId }: {
			popupId: number,
		}) => await deleteBanner('popup', popupId),
		...mutationOptions,
	})
}
