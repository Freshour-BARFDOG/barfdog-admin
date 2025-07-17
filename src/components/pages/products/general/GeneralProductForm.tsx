"use client";

import * as styles from "./GeneralProduct.css";
import { commonWrapper } from "@/styles/common.css";
import { ChangeEvent, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  ControllerRenderProps,
  useFieldArray,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import {
  unformatCommaNumber,
  formatNumberWithComma,
} from "@/utils/formatNumber";
import { useToastStore } from "@/store/useToastStore";
import {
  GeneralProductFormKeys,
  GeneralProductFormValues,
} from "@/utils/validation/products/generalProduct";
import {
  GeneralProductCreateType,
  ItemHealthType,
  ItemIcons,
  ProductVisibilityStatus,
} from "@/types/products";
import SelectBox from "@/components/common/selectBox/SelectBox";
import {
  BOOLEAN_OPTIONS,
  DELIVERY_FREE_OPTIONS,
  GENERAL_PRODUCT_CATEGORY_OPTIONS_FOR_CREATE,
  ICON_TYPE_OPTIONS,
  ITEM_HEALTH_TYPE_OPTIONS,
  ITEM_STATUS_OPTIONS,
} from "@/constants/products";
import LabeledCheckboxGroup from "@/components/common/labeledCheckBoxGroup/LabeledCheckBoxGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import Divider from "@/components/common/divider/Divider";
import Textarea from "@/components/common/textarea/Textarea";
import DiscountField from "../common/discountField/DiscountField";
import AllianceDiscountField from "../common/discountField/AllianceDiscountField";
import OptionField from "../common/optionField/OptionField";
import MultiFileUpload from "@/components/common/multiFileUpload/MultiFileUpload";
import TiptapEditor from "@/components/common/tiptapEditor/TiptapEditor";
import { parseImageIdsFromContent } from "@/utils/parseImageIdsFromContent";
import { useUploadImage } from "@/api/common/mutations/useUploadImage";

interface InputFieldItem {
  name: GeneralProductFormKeys;
  label: string;
  render: (
    field: ControllerRenderProps<
      GeneralProductFormValues,
      GeneralProductFormKeys
    >
  ) => ReactNode;
}

interface GeneralProductFormProps {
  form: UseFormReturn<GeneralProductFormValues>;
  mode: "create" | "edit";
  allianceOptions: { value: number; label: string }[];
  onSubmit: (vals: GeneralProductFormValues) => void;
}

export default function GeneralProductForm({
  form,
  mode,
  allianceOptions,
  onSubmit,
}: GeneralProductFormProps) {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { mutateAsync: uploadContentsAsync } = useUploadImage(
    "/api/admin/items/contentImage/upload"
  );

  const isEdit = mode === "edit";

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { isValid, errors },
  } = form;
  console.log("watch", watch());
  console.log("errors", errors);
  console.log("isValid", isValid);

  const originalPrice = useWatch({ control, name: "originalPrice" });
  const inStock = useWatch({ control, name: "inStock" });
  const contents = useWatch({ control, name: "contents" });
  const addImageIdList =
    useWatch({
      control,
      name: "addImageIdList",
    }) ?? [];
  const deleteImageIdList =
    useWatch({
      control,
      name: "deleteImageIdList",
    }) ?? [];
  const addContentImageIdList =
    useWatch({
      control,
      name: "addContentImageIdList",
    }) ?? [];
  const deleteContentImageIdList =
    useWatch({
      control,
      name: "deleteContentImageIdList",
    }) ?? [];
  const {
    fields: allianceFields,
    append: appendAlliance,
    remove: removeAlliance,
  } = useFieldArray({
    name: "allianceDtoList",
    control,
  });
  const {
    fields: imageFields,
    replace: replaceImages,
    remove: removeImage,
  } = useFieldArray({
    name: "imageOrderDtoList",
    control,
    keyName: "fieldArrayId",
  });

  // 제휴사 추가
  const handleAddAlliance = (allianceId: number) => {
    if (allianceFields.some((f) => f.allianceId === allianceId)) return;
    appendAlliance({
      allianceId,
      allianceDegree: 0,
      allianceDiscountType: "FLAT_RATE",
      allianceSalePrice: originalPrice,
    });
  };

  const handleChangeNumberType = (
    e: ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: number) => void }
  ) => {
    const raw = unformatCommaNumber(e.target.value);
    field.onChange(raw);
  };

  /** 상품 이미지 핸들러 */
  const handleProductImagesChange = useCallback(
    async (files: { id?: number; filename: string; url: string }[] | null) => {
      if (!files) {
        // 전체 삭제
        replaceImages([]);
        setValue("deleteImageIdList", [
          ...deleteImageIdList,
          ...addImageIdList,
        ]);
        setValue("addImageIdList", []);
        await trigger();
        return;
      }
      // id 있는 파일만
      const valid = files
        .filter((f) => f.id != null)
        .map((f) => ({ id: f.id!, url: f.url }));
      const validIds = valid.map((v) => v.id);

      // 삭제된 ID
      const deleted = addImageIdList.filter((old) => !validIds.includes(old));
      setValue(
        "deleteImageIdList",
        Array.from(new Set([...deleteImageIdList, ...deleted]))
      );
      setValue("addImageIdList", validIds);

      // imageOrderDtoList 를 id, leakOrder, url 로 갱신
      const next = valid.map((v, i) => ({
        id: v.id,
        leakOrder: i + 1,
        url: v.url,
      }));
      replaceImages(next);
      await trigger();
    },
    [addImageIdList, deleteImageIdList, replaceImages, setValue]
  );

  /** 개별 삭제 핸들러 */
  const handleProductImageRemove = useCallback(
    (id: number) => {
      // 남은 fieldArray 항목 중 id !== 삭제 id
      const remaining = imageFields.filter((f) => f.id !== id);
      // 삭제 기록
      setValue("deleteImageIdList", [...deleteImageIdList, id]);
      setValue(
        "addImageIdList",
        remaining.map((f) => f.id!)
      );
      // order 재부여
      replaceImages(
        remaining.map((f, i) => ({
          id: f.id!,
          leakOrder: i + 1,
          url: f.url,
        }))
      );
    },
    [imageFields, deleteImageIdList, replaceImages, setValue]
  );

  // --- Tiptap handlers ---
  const onContentChange = useCallback(
    (html: string) => {
      setValue("contents", html, { shouldValidate: true });
      const current = parseImageIdsFromContent(html);
      const deleted = addContentImageIdList.filter(
        (old) => !current.includes(old)
      );
      setValue("deleteContentImageIdList", [
        ...new Set([...deleteContentImageIdList, ...deleted]),
      ]);
      setValue("addContentImageIdList", current);
    },
    [addContentImageIdList, deleteContentImageIdList, setValue]
  );

  // 에디터 내 이미지 업로드 핸들러
  const handleImageUpload = useCallback(
    async (file: File): Promise<string | undefined> => {
      try {
        const { id, url } = await uploadContentsAsync({ file });
        setValue("addContentImageIdList", [...addContentImageIdList, id]);
        return `${url}#id=${id}#`;
      } catch {
        addToast("이미지 업로드에 실패했습니다.");
      }
    },
    [addContentImageIdList, uploadContentsAsync, setValue, addToast]
  );

  const InputFieldList: InputFieldItem[] = [
    {
      name: "itemType",
      label: "카테고리",
      render: (field) => (
        <LabeledRadioButtonGroup<GeneralProductCreateType>
          options={GENERAL_PRODUCT_CATEGORY_OPTIONS_FOR_CREATE}
          value={field.value as GeneralProductCreateType}
          onChange={field.onChange}
        />
      ),
    },
    {
      name: "itemHealthType",
      label: "추천 상품",
      render: (field) => (
        <LabeledCheckboxGroup<ItemHealthType>
          options={ITEM_HEALTH_TYPE_OPTIONS}
          selectedValues={field.value as ItemHealthType[]}
          onChange={field.onChange}
        />
      ),
    },
    {
      name: "name",
      label: "상품명",
      render: (field) => (
        <InputField value={field.value as string} onChange={field.onChange} />
      ),
    },
    {
      name: "description",
      label: "상품 설명",
      render: (field) => (
        <Textarea
          value={field.value as string}
          onChange={field.onChange}
          error={errors.description?.message}
        />
      ),
    },
    {
      name: "originalPrice",
      label: "상품가격",
      render: (field) => (
        <div className={commonWrapper({ gap: 8, justify: "start" })}>
          <div className={styles.inputFieldStyle}>
            <InputField
              value={formatNumberWithComma(field.value as number)}
              onChange={(e) => handleChangeNumberType(e, field)}
            />
          </div>
          <Text type="body3">원 이상</Text>
        </div>
      ),
    },
  ];

  const InputFieldList2: InputFieldItem[] = [
    {
      name: "itemIcons",
      label: "상품 아이콘",
      render: (field) => (
        <LabeledCheckboxGroup<ItemIcons>
          options={ICON_TYPE_OPTIONS}
          selectedValues={field.value as ItemIcons[]}
          onChange={field.onChange}
        />
      ),
    },
    {
      name: "deliveryFree",
      label: "배송비",
      render: (field) => (
        <LabeledRadioButtonGroup<boolean>
          options={DELIVERY_FREE_OPTIONS}
          value={field.value as boolean}
          onChange={field.onChange}
        />
      ),
    },
    {
      name: "itemStatus",
      label: "노출여부",
      render: (field) => (
        <LabeledRadioButtonGroup<ProductVisibilityStatus>
          options={ITEM_STATUS_OPTIONS}
          value={field.value as ProductVisibilityStatus}
          onChange={field.onChange}
        />
      ),
    },
  ];

  return (
    <>
      <Card shadow="none" padding={20}>
        <div className={commonWrapper({ direction: "col", gap: 12 })}>
          {InputFieldList.map((input, index) => (
            <Controller
              control={control}
              key={input.name}
              name={input.name}
              render={({ field }) => (
                <InputFieldGroup
                  label={input.label}
                  divider={index !== InputFieldList.length - 1}
                >
                  {input.render(field)}
                </InputFieldGroup>
              )}
            />
          ))}
          <Divider thickness={1} color="gray200" />
          <InputFieldGroup label="할인설정" divider>
            <DiscountField control={control} originalPrice={originalPrice} />
          </InputFieldGroup>
          <InputFieldGroup label="제휴사 추가" divider isLabelRequired={false}>
            <div
              className={commonWrapper({
                direction: "col",
                gap: 12,
                align: "start",
              })}
            >
              <SelectBox<number>
                options={allianceOptions}
                placeholder="제휴사 선택"
                onChange={handleAddAlliance}
              />
              {allianceFields.map((field, idx) => {
                const allianceName =
                  allianceOptions.find((o) => o.value === field.allianceId)
                    ?.label ?? "";
                return (
                  <AllianceDiscountField
                    key={field.id}
                    namePrefix={`allianceDtoList.${idx}`}
                    control={control}
                    originalPrice={originalPrice}
                    allianceName={allianceName}
                    onRemove={() => removeAlliance(idx)}
                  />
                );
              })}
            </div>
          </InputFieldGroup>
          <InputFieldGroup label="재고여부" divider>
            <div
              className={commonWrapper({
                direction: "col",
                gap: 8,
                align: "start",
              })}
            >
              <Controller
                control={control}
                name="inStock"
                render={({ field }) => (
                  <LabeledRadioButtonGroup<boolean>
                    options={BOOLEAN_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {inStock && (
                <Controller
                  control={control}
                  name="remaining"
                  render={({ field }) => (
                    <div className={styles.inputFieldStyle}>
                      <InputField
                        value={formatNumberWithComma(field.value)}
                        onChange={(e) =>
                          field.onChange(unformatCommaNumber(e.target.value))
                        }
                        unit="개"
                      />
                    </div>
                  )}
                />
              )}
            </div>
          </InputFieldGroup>
          <InputFieldGroup label="옵션 추가" divider isLabelRequired={false}>
            <OptionField
              isEdit={isEdit}
              control={control}
              setValue={setValue}
            />
          </InputFieldGroup>
          <InputFieldGroup label="상품 이미지" divider>
            <MultiFileUpload
              uploadApiUrl="/api/admin/items/image/upload"
              initialImages={imageFields.map((f) => ({
                id: f.id,
                filename: "",
                url: f.url,
              }))}
              onFilesChange={handleProductImagesChange}
              handleRemove={handleProductImageRemove}
              title="상품 이미지 업로드"
              subTitle="최대 10장까지 등록 가능합니다."
            />
          </InputFieldGroup>
          <InputFieldGroup label="상세 내용" align="start" divider={false}>
            <TiptapEditor
              content={contents}
              onUpdate={onContentChange}
              onImageUpload={handleImageUpload}
            />
          </InputFieldGroup>
          {InputFieldList2.map((input, index) => (
            <Controller
              control={control}
              key={input.name}
              name={input.name}
              render={({ field }) => (
                <InputFieldGroup
                  label={input.label}
                  divider={index !== InputFieldList.length - 1}
                >
                  {input.render(field)}
                </InputFieldGroup>
              )}
            />
          ))}
        </div>
      </Card>
      <div className={commonWrapper({ gap: 8, padding: 20 })}>
        <Button
          onClick={() => router.push("/products/general")}
          variant="outline"
          type="assistive"
        >
          취소
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          등록
        </Button>
      </div>
    </>
  );
}
