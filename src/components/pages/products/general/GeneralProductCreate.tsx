"use client";

import * as styles from "./GeneralProduct.css";
import { commonWrapper } from "@/styles/common.css";
import { ChangeEvent, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  ControllerRenderProps,
  useFieldArray,
  useForm,
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
import { useCreateGeneralProduct } from "@/api/products/mutations/useCreateGeneralProduct";
import {
  CreateGeneralKeys,
  createGeneralSchema,
  CreateGeneralValues,
  defaultCreateGeneralValues,
} from "@/utils/validation/products/generalProduct";
import {
  AllianceDto,
  GeneralProductCreateType,
  ItemHealthType,
} from "@/types/products";
import SelectBox from "@/components/common/selectBox/SelectBox";
import {
  GENERAL_PRODUCT_CATEGORY_OPTIONS_FOR_CREATE,
  ITEM_HEALTH_TYPE_OPTIONS,
} from "@/constants/products";
import LabeledCheckboxGroup from "@/components/common/labeledCheckBoxGroup/LabeledCheckBoxGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "yup";
import { buildCreateGeneralPayload } from "@/utils/products/buildCreateGeneralPayload";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import Divider from "@/components/common/divider/Divider";
import { useGetAllianceList } from "@/api/products/queries/useGetAllianceList";
import AllianceDiscountField from "@/components/common/discountField/AllianceDiscountField";
import { DiscountField } from "@/components/common/discountField/DiscountField";

interface InputFieldItem {
  name: CreateGeneralKeys;
  label: string;
  render: (
    field: ControllerRenderProps<CreateGeneralValues, CreateGeneralKeys>
  ) => ReactNode;
}

export default function GeneralProductCreate() {
  const router = useRouter();
  const { data: allianceData } = useGetAllianceList();
  const { mutate } = useCreateGeneralProduct();
  const { addToast } = useToastStore();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<yup.InferType<typeof createGeneralSchema>>({
    resolver: yupResolver(createGeneralSchema),
    defaultValues: defaultCreateGeneralValues,
    mode: "all",
  });
  console.log(watch());

  const originalPrice = useWatch({ control, name: "originalPrice" });

  const { fields, append, update, remove } = useFieldArray({
    name: "allianceDtoList",
    control,
  });

  const allianceOptions = (allianceData ?? []).map((a) => ({
    value: a.allianceId,
    label: a.allianceName,
  }));

  // 제휴사 추가
  const handleAddAlliance = (allianceId: number) => {
    if (fields.some((f) => f.allianceId === allianceId)) return;
    append({
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

  const onSubmit = (formValues: CreateGeneralValues) => {
    const payload = buildCreateGeneralPayload(formValues);
    mutate(payload, {
      onSuccess: async () => {
        addToast("일반 상품 등록이 완료되었습니다");
        router.push("/products/general");
      },
      onError: () => {
        addToast("일반 상품 등록을 실패했습니다");
      },
    });
  };

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
        <InputField value={field.value as string} onChange={field.onChange} />
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
          <InputFieldGroup label="제휴사 추가" divider>
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
              {fields.map((field, idx) => {
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
                    onRemove={() => remove(idx)}
                  />
                );
              })}
            </div>
          </InputFieldGroup>
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
