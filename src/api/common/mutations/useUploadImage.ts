import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/api/common/common";
import { UseMutationCustomOptions } from "@/types/common";

export { useUploadImage };

function useUploadImage(
  apiUrl: string,
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (fileData: { file: File }) =>
      uploadImage({ file: fileData.file, apiUrl }),
    ...mutationOptions,
  });
}
