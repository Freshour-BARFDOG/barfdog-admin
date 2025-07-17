import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { uploadEventImage } from "@/api/community/community";
import { EventImageType } from "@/types/community";

export function useUploadEventImage(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async ({ type, file }: {
			type: EventImageType,
			file: File | null,
		}) => await uploadEventImage(type, file),
		...mutationOptions,
	})
}
