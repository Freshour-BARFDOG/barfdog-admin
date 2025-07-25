import { Path, PathValue, UseFormSetValue } from "react-hook-form";
import { UploadResponse } from "@/types/common";
import { useToastStore } from "@/store/useToastStore";

type ThumbnailUploaderFields = {
  thumbnailId: number | null;
  thumbnailUrl?: string;
  filename?: string;
};

export function useThumbnailUploader<T extends ThumbnailUploaderFields>(
	setValue: UseFormSetValue<T>,
	uploadFn: (file: File) => Promise<UploadResponse>
) {
  const { addToast } = useToastStore();

  const handleThumbnailChange = async (file: File | null) => {
    if (!file) return;
    try {
      const result = await uploadFn(file);
      const id = (result as UploadResponse)?.id;
      const url = (result as UploadResponse)?.url;
      if (!id || !url) {
        throw new Error('이미지 업로드 응답이 올바르지 않습니다.');
      }
      const thumbnailId = "thumbnailId" as Path<T>;
      const thumbnailUrl = "thumbnailUrl" as Path<T>;
      const filename = "filename" as Path<T>;

      setValue(thumbnailId, id as PathValue<T, typeof thumbnailId>, { shouldValidate: true });
      setValue(thumbnailUrl, url as PathValue<T, typeof thumbnailUrl>, { shouldValidate: true });
      setValue(filename, file.name as PathValue<T, typeof filename>, { shouldValidate: true });
    } catch (error) {
      console.log(error)
      addToast('이미지 업로드 실패');
      return;
    }
  }

  return {
    handleThumbnailChange,
  };
}