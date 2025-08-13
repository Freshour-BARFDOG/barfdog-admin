"use client";

import * as styles from "./GeneralProduct.css";
import { commonWrapper, pointColor } from "@/styles/common.css";
import { ReactNode, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
} from "react-hook-form";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import { formatNumberWithComma } from "@/utils/formatNumber";
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
import {
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
import OptionField from "../common/optionField/OptionField";
import TiptapEditor from "@/components/common/tiptapEditor/TiptapEditor";
import MultiFileUploader from "@/components/common/multiFileUploader/MultiFileUploader";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import AllianceSection from "./sections/AllianceSection";
import StockSection from "./sections/StockSection";
import { useGeneralProductForm } from "@/hooks/useGeneralProductForm";

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
  const isEdit = mode === "edit";

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const hasErrors = Object.keys(errors).length > 0;
  const { watchedValues, handlers } = useGeneralProductForm(form);

  // 기본 필드들 (메모이제이션)
  const basicFields: InputFieldItem[] = useMemo(
    () => [
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
                onChange={(e) => handlers.handleChangeNumberType(e, field)}
              />
            </div>
          </div>
        ),
      },
    ],
    [errors.description?.message, handlers.handleChangeNumberType]
  );

  // 하단 필드들 (메모이제이션)
  const bottomFields: InputFieldItem[] = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <>
      <Card shadow="none" padding={20}>
        <div className={commonWrapper({ direction: "col", gap: 12 })}>
          {basicFields.map((input, index) => (
            <Controller
              control={control}
              key={input.name}
              name={input.name}
              render={({ field }) => (
                <InputFieldGroup
                  label={input.label}
                  divider={index !== basicFields.length - 1}
                >
                  {input.render(field)}
                </InputFieldGroup>
              )}
            />
          ))}

          <Divider thickness={1} color="gray200" />

          {/* 할인 설정 */}
          <InputFieldGroup label="할인설정" divider>
            <DiscountField
              control={control}
              originalPrice={watchedValues.originalPrice}
            />
          </InputFieldGroup>

          {/* 제휴사 섹션 */}
          <AllianceSection
            control={control}
            originalPrice={watchedValues.originalPrice}
            allianceOptions={allianceOptions}
          />

          {/* 재고 섹션 */}
          <StockSection control={control} inStock={watchedValues.inStock} />

          {/* 옵션 섹션 */}
          <InputFieldGroup
            label={
              <TooltipInfo title="옵션 추가">
                1. 옵션명, 재고수량은 필수항목입니다.
                <br />
                2. 사용하지 않는 옵션항목은 삭제하세요
              </TooltipInfo>
            }
            isLabelRequired={false}
          >
            <OptionField
              isEdit={isEdit}
              control={control}
              setValue={setValue}
            />
          </InputFieldGroup>

          {/* 이미지 업로드 */}
          <InputFieldGroup label="상품 이미지" divider>
            <MultiFileUploader
              maxFiles={10}
              onChange={handlers.handleFileUpload}
              onRemove={handlers.handleFileRemove}
              initialFiles={watchedValues.imageOrderDtoList}
              width={100}
              height={100}
              captions={[
                "* 이미지는 최소 1장, 최대 10장까지 등록 가능합니다.",
                "* 파일 크기는 10MB 이하, jpg/jpeg/png/gif만 허용됩니다.",
              ]}
            />
          </InputFieldGroup>

          {/* 상세 내용 */}
          <InputFieldGroup label="상세 내용" align="start" divider={false}>
            <TiptapEditor
              content={watchedValues.contents}
              onUpdate={handlers.onContentChange}
              onImageUpload={handlers.handleImageUpload}
            />
          </InputFieldGroup>

          {/* 하단 필드들 */}
          {bottomFields.map((input, index) => (
            <Controller
              control={control}
              key={input.name}
              name={input.name}
              render={({ field }) => (
                <InputFieldGroup
                  label={
                    input.name === "itemIcons" ? (
                      <TooltipInfo
                        title={
                          <>
                            상품 아이콘 <span className={pointColor}>*</span>
                          </>
                        }
                      >
                        일반상품리스트 썸네일 상단에 노출된 아이콘입니다.
                      </TooltipInfo>
                    ) : (
                      input.label
                    )
                  }
                  isLabelRequired={input.name !== "itemIcons"}
                  divider={index !== bottomFields.length - 1}
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
          onClick={() => router.back()}
          variant="outline"
          type="assistive"
        >
          취소
        </Button>
        <Button onClick={() => onSubmit(getValues())} disabled={hasErrors}>
          {isEdit ? "수정" : "등록"}
        </Button>
      </div>
    </>
  );
}
