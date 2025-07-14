import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { BannerLeakedOrderDirection } from "@/types/banners";
import { updateBannerLeakedOrder} from "@/api/banners/banners";

export function useUpdateMainBannerLeakedOrder(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ bannerId, direction }: {
			bannerId: number,
			direction: BannerLeakedOrderDirection,
		}) => await updateBannerLeakedOrder('main', bannerId, direction),
		...mutationOptions,
	})
}
