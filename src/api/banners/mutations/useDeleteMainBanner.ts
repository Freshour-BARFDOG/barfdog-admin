import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteBanner } from "@/api/banners/banners";

export function useDeleteMainBanner(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ bannerId }: {
			bannerId: number,
		}) => await deleteBanner('main', bannerId),
		...mutationOptions,
	})
}
