import { Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { UploadResponse } from "@/types/community";
import { parseImageIdsFromContent } from "@/utils/parseImageIdsFromContent";
import { useToastStore } from "@/store/useToastStore";

type ContentEditorFields = {
  contents: string;
  addImageIdList: number[];
  deleteImageIdList: number[];
};

export function useContentEditor<T extends ContentEditorFields>(
	setValue: UseFormSetValue<T>,
	watch: UseFormWatch<T>,
	uploadFn: (file: File) => Promise<UploadResponse>
) {
  const { addToast } = useToastStore();

  const handleContentChange = (html: string) => {
    const contentsField = "contents" as Path<T>;
    const addImageIdList = "addImageIdList" as Path<T>;
    const deleteImageIdList = "deleteImageIdList" as Path<T>;

    const prevContents = watch(contentsField);
    if (prevContents !== html) {
      setValue(contentsField, html as PathValue<T, typeof contentsField>, { shouldValidate: true });
    }

    const currentIds = parseImageIdsFromContent(html);
    const prevAddList = watch(addImageIdList) ?? [];
    const deletedIds = (prevAddList as number[]).filter((id: number) => !currentIds.includes(id));

    setValue(addImageIdList, currentIds as PathValue<T, typeof addImageIdList>);
    setValue(deleteImageIdList, deletedIds as PathValue<T, typeof addImageIdList>);
  };

  const handleImageUpload = async (file: File): Promise<string | undefined> => {
    if (!file) return;
		const addImageIdList = "addImageIdList" as Path<T>;
    try {
      const { id, url } = await uploadFn(file);
      if (!id || !url) throw new Error('이미지 업로드 응답이 올바르지 않습니다.');

      const prevList = watch(addImageIdList) ?? [];
      setValue(addImageIdList, [...prevList as number[], id] as PathValue<T, typeof addImageIdList>);

      return `${url}#id=${id}#`;
    } catch (e) {
      console.error(e);
      addToast('이미지 업로드 실패');
    }
  };

  return {
    handleContentChange,
    handleImageUpload,
  };
}