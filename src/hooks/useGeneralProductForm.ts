import { useCallback } from "react";
import { ChangeEvent } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { GeneralProductFormValues } from "@/utils/validation/products/generalProduct";
import { unformatCommaNumber } from "@/utils/formatNumber";
import { useToastStore } from "@/store/useToastStore";
import { useUploadImage } from "@/api/common/mutations/useUploadImage";
import { parseImageIdsFromContent } from "@/utils/parseImageIdsFromContent";
import { useMultiImageUploader } from "@/hooks/useMultiImageUploader";
import { UploadResponse } from "@/types/common";

export const useGeneralProductForm = (form: UseFormReturn<GeneralProductFormValues>) => {
  const { setValue, watch, control } = form;
  const { addToast } = useToastStore();
  
  const { mutateAsync: uploadContentsAsync } = useUploadImage(
    "/api/admin/items/contentImage/upload"
  );
  const { mutateAsync: uploadImage } = useUploadImage(
    "/api/admin/items/image/upload"
  );

  // Watch 값들
  const watchedValues = {
    originalPrice: useWatch({ control, name: "originalPrice" }),
    inStock: useWatch({ control, name: "inStock" }),
    contents: useWatch({ control, name: "contents" }),
    imageOrderDtoList: useWatch({ control, name: "imageOrderDtoList" }),
    addImageIdList: useWatch({ control, name: "addImageIdList" }) ?? [],
    deleteImageIdList: useWatch({ control, name: "deleteImageIdList" }) ?? [],
    addContentImageIdList: useWatch({ control, name: "addContentImageIdList" }) ?? [],
    deleteContentImageIdList: useWatch({ control, name: "deleteContentImageIdList" }) ?? [],
  };

  // 숫자 입력 핸들러
  const handleChangeNumberType = useCallback((
    e: ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: number) => void }
  ) => {
    const raw = unformatCommaNumber(e.target.value);
    field.onChange(raw);
  }, []);

  // 이미지 업로더
  const { handleFileUpload, handleFileRemove } = useMultiImageUploader<GeneralProductFormValues>({
    uploadFn: (file: File) => uploadImage({ file }) as Promise<UploadResponse>,
    imageOrderKey: "imageOrderDtoList",
    addImageIdKey: "addImageIdList",
    deleteImageIdKey: "deleteImageIdList",
    setValue,
    watch,
    imageList: watchedValues.imageOrderDtoList,
  });

  // 컨텐츠 변경 핸들러
  const onContentChange = useCallback(
    (html: string) => {
      setValue("contents", html, { shouldValidate: true });
      const current = parseImageIdsFromContent(html);
      const deleted = watchedValues.addContentImageIdList.filter(
        (old) => !current.includes(old)
      );
      setValue("deleteContentImageIdList", [
        ...new Set([...watchedValues.deleteContentImageIdList, ...deleted]),
      ]);
      setValue("addContentImageIdList", current);
    },
    [watchedValues.addContentImageIdList, watchedValues.deleteContentImageIdList, setValue]
  );

  // 에디터 이미지 업로드 핸들러
  const handleImageUpload = useCallback(
    async (file: File): Promise<string | undefined> => {
      try {
        const { id, url } = await uploadContentsAsync({ file });
        setValue("addContentImageIdList", [...watchedValues.addContentImageIdList, id]);
        return `${url}#id=${id}#`;
      } catch {
        addToast("이미지 업로드에 실패했습니다.");
      }
    },
    [watchedValues.addContentImageIdList, uploadContentsAsync, setValue, addToast]
  );

  return {
    watchedValues,
    handlers: {
      handleChangeNumberType,
      handleFileUpload,
      handleFileRemove,
      onContentChange,
      handleImageUpload,
    },
  };
};