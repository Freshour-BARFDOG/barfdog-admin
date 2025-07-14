import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { BannerLeakedOrderDirection } from "@/types/banners";
import { updateBannerLeakedOrder } from "@/api/banners/banners";

export function useUpdatePopupLeakedOrder(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ popupId, direction }: {
			popupId: number,
			direction: BannerLeakedOrderDirection,
		}) => await updateBannerLeakedOrder('popup', popupId, direction),
		...mutationOptions,
	})
}
