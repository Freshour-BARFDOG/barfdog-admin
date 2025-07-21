import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { uploadCreateAnswerImage } from "@/api/community/community";

export function useUploadCreateAnswerImage(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ file }: {
			file: File | null,
		}) => await uploadCreateAnswerImage(file),
		...mutationOptions,
	})
}
