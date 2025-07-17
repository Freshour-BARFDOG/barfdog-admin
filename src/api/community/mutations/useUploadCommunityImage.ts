import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { uploadCommunityImage } from "@/api/community/community";

export function useUploadCommunityImage(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ file }: {
			file: File | null,
		}) => await uploadCommunityImage(file),
		...mutationOptions,
	})
}
