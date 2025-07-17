import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { uploadThumbnailImage } from "@/api/community/community";

export function useUploadThumbnailImage(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ file }: {
			file: File | null,
		}) => await uploadThumbnailImage(file),
		...mutationOptions,
	})
}
