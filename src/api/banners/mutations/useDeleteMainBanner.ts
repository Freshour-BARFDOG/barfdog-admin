import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteMainBanner } from "@/api/banners/banners";

export function useDeleteMainBanner(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ bannerId }: {
			bannerId: number,
		}) => deleteMainBanner(bannerId),
		...mutationOptions,
	})
}
