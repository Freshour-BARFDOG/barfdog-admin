"use client";

import * as styles from "./GeneralProduct.css";
import { commonWrapper, pointColor } from "@/styles/common.css";
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
import TiptapEditor from "@/components/common/tiptapEditor/TiptapEditor";
import { parseImageIdsFromContent } from "@/utils/parseImageIdsFromContent";
import { useUploadImage } from "@/api/common/mutations/useUploadImage";
import MultiFileUploader from "@/components/common/multiFileUploader/MultiFileUploader";
import { useMultiImageUploader } from "@/hooks/useMultiImageUploader";
import { UploadResponse } from "@/types/community";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";

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
  const { mutateAsync: uploadImage } = useUploadImage(
    "/api/admin/items/image/upload"
  );
  const isEdit = mode === "edit";

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { isValid, errors },
  } = form;

  const originalPrice = useWatch({ control, name: "originalPrice" });
  const inStock = useWatch({ control, name: "inStock" });
  const contents = useWatch({ control, name: "contents" });
  const imageOrderDtoList = useWatch({ control, name: "imageOrderDtoList" });
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

  const { handleFileUpload, handleFileRemove } =
    useMultiImageUploader<GeneralProductFormValues>({
      uploadFn: (file: File) =>
        uploadImage({ file }) as Promise<UploadResponse>,
      imageOrderKey: "imageOrderDtoList",
      addImageIdKey: "addImageIdList",
      deleteImageIdKey: "deleteImageIdList",
      setValue,
      watch,
      imageList: imageOrderDtoList,
    });

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
          <InputFieldGroup
            label={(
              <TooltipInfo
                title={(
                  <>재고 여부 <span className={pointColor}>*</span></>
                )}
              >
                1. 품절된 상품은 아이템리스트 내에 품절처리 UI로 나타납니다.<br/>
                2. 품절된 상품은 상세페이지로 접근할 수 없습니다.
              </TooltipInfo>
            )}
            isLabelRequired={false}
            divider
          >
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
          <InputFieldGroup
            label={(
              <TooltipInfo title='옵션 추가'>
                1. 옵션명, 재고수량은 필수항목입니다.<br/>
                2. 사용하지 않는 옵션항목은 삭제하세요
              </TooltipInfo>
            )}
            isLabelRequired={false}
          >
            <OptionField
              isEdit={isEdit}
              control={control}
              setValue={setValue}
            />
          </InputFieldGroup>
          <InputFieldGroup label="상품 이미지" divider>
            <MultiFileUploader
              maxFiles={10}
              // 기존에 불러온 이미지도 보여주기 위해 id,url,filename 형태로 넘깁니다.
              onChange={(files) => handleFileUpload(files)}
              onRemove={handleFileRemove}
              initialFiles={imageOrderDtoList}
              width={100}
              height={100}
              captions={[
                "* 이미지는 최소 1장, 최대 10장까지 등록 가능합니다.",
                "* 파일 크기는 10MB 이하, jpg/jpeg/png/gif만 허용됩니다.",
              ]}
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
                  label={input.name === 'itemIcons'
                    ? (
                      <TooltipInfo
                        title={(
                          <>상품 아이콘 <span className={pointColor}>*</span></>
                        )}
                      >
                        일반상품리스트 썸네일 상단에 노출된 아이콘입니다.
                      </TooltipInfo>
                    ) : input.label
                  }
                  isLabelRequired={input.name !== 'itemIcons'}
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
