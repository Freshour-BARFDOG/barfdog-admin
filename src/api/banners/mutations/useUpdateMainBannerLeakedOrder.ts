import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { BannerLeakedOrderDirection } from "@/types/banners";
import { updateMainBannerLeakedOrder } from "@/api/banners/banners";

export function useUpdateMainBannerLeakedOrder(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ bannerId, direction }: {
			bannerId: number,
			direction: BannerLeakedOrderDirection,
		}) => updateMainBannerLeakedOrder(bannerId, direction),
		...mutationOptions,
	})
}
