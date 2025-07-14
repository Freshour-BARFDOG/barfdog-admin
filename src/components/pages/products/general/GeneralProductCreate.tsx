"use client";
import * as styles from "../../../Benefits.css";
import { discountUnitButton } from "@/styles/common.css";
import { ChangeEvent, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Controller, ControllerRenderProps } from "react-hook-form";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import InputField from "@/components/common/inputField/InputField";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
  unformatCommaNumber,
  formatNumberWithComma,
} from "@/utils/formatNumber";
import { useToastStore } from "@/store/useToastStore";
import {
  CREATE_COUPON_TARGET_LIST,
  CREATE_COUPON_TYPE_LIST,
} from "@/constants/benefits/coupons";
import {
  DISCOUNT_UNIT_TYPE,
  DISCOUNT_UNIT_TYPE_LIST,
  UNLIMITED_VALUE,
} from "@/constants/common";
import {
  createCouponSchema,
  defaultCreateCouponValues,
} from "@/utils/validation/benefits/coupon/createCoupon";
import { useCreateGeneralProduct } from "@/api/products/mutations/useCreateGeneralProduct";
import {
  CreateGeneralKeys,
  CreateGeneralValues,
} from "@/utils/validation/products/generalProduct";
import {
  CreateGeneralProductRequest,
  GeneralProductType,
} from "@/types/products";
import SelectBox from "@/components/common/selectBox/SelectBox";
import { GENERAL_PRODUCT_CATEGORY_OPTIONS } from "@/constants/products";
import LabeledCheckboxGroup from "@/components/common/labeledCheckBoxGroup/LabeledCheckBoxGroup";

interface InputFieldItem {
  name: CreateGeneralKeys;
  label: string;
  render: (
    field: ControllerRenderProps<CreateGeneralValues, CreateGeneralKeys>
  ) => ReactNode;
}

export default function GeneralProductCreate() {
  const router = useRouter();
  const { control, handleSubmit, setValue, watch, isValid } =
    useFormHandler<CreateGeneralValues>(
      createCouponSchema,
      defaultCreateCouponValues,
      "all"
    );

  const { mutate } = useCreateGeneralProduct();
  const { addToast } = useToastStore();

  const handleChangeNumberType = (
    e: ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: number) => void }
  ) => {
    const raw = unformatCommaNumber(e.target.value);
    field.onChange(raw);
  };

  const onSubmit = (data: CreateGeneralProductRequest) => {
    mutate(
      data,

      {
        onSuccess: async () => {
          addToast("일반 상품 등록이 완료되었습니다");
          router.push("/products/general");
        },
        onError: (error) => {
          addToast("일반 상품 등록을 실패했습니다");
        },
      }
    );
  };

  const InputFieldList: InputFieldItem[] = [
    {
      name: "itemType",
      label: "쿠폰 타입",
      render: (field) => (
        <SelectBox<GeneralProductType>
          options={GENERAL_PRODUCT_CATEGORY_OPTIONS}
          value={field.value ?? "ALL"}
          onChange={field.onChange}
        />
      ),
    },
    {
      name: "itemHealthType",
      label: "추천 상품",
      render: (field) => (
        <LabeledCheckboxGroup
          value={field.value ?? ""}
          onChange={field.onChange}
          options={CREATE_COUPON_TARGET_LIST}
        />
      ),
    },
    {
      name: "description",
      label: "쿠폰 설명",
      render: (field) => (
        <InputField value={field.value} onChange={field.onChange} />
      ),
    },
    {
      name: "couponTarget",
      label: "사용처",
      render: (field) => (
        <LabeledRadioButtonGroup
          value={field.value ?? ""}
          onChange={field.onChange}
          options={CREATE_COUPON_TARGET_LIST}
        />
      ),
    },
    {
      name: "code",
      label: "쿠폰 코드",
      render: (field) => (
        <div className={styles.benefitInputBox}>
          <div className={styles.benefitInput}>
            <InputField
              value={field.value}
              onChange={field.onChange}
              disabled={watch("couponType") === "GENERAL_PUBLISHED"}
            />
          </div>
        </div>
      ),
    },
    {
      name: "discountDegree",
      label: "할인율",
      render: (field) => (
        <div className={styles.benefitInputBox}>
          <div className={styles.benefitInput}>
            <InputField
              value={formatNumberWithComma(field.value)}
              onChange={(e) => handleChangeNumberType(e, field)}
            />
          </div>
          <div>
            {DISCOUNT_UNIT_TYPE_LIST.map((unit) => (
              <button
                key={unit.value}
                onClick={(e) => {
                  e.preventDefault();
                  setValue(
                    "discountType",
                    unit.value as keyof typeof DISCOUNT_UNIT_TYPE
                  );
                }}
                className={discountUnitButton({
                  active: String(unit.value === watch("discountType")),
                })}
              >
                {unit.label}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "availableMaxDiscount",
      label: "최대 할인 금액",
      render: (field) => (
        <div className={styles.benefitInputBox}>
          <div className={styles.benefitInput}>
            <InputField
              value={formatNumberWithComma(field.value)}
              onChange={(e) => handleChangeNumberType(e, field)}
            />
          </div>
          <Text type="body3">원 할인</Text>
        </div>
      ),
    },
    {
      name: "availableMinPrice",
      label: "최소 사용 금액",
      render: (field) => (
        <div className={styles.benefitInputBox}>
          <div className={styles.benefitInput}>
            <InputField
              value={formatNumberWithComma(field.value)}
              onChange={(e) => handleChangeNumberType(e, field)}
            />
          </div>
          <Text type="body3">원 이상</Text>
        </div>
      ),
    },
    {
      name: "amount",
      label: "사용한도(횟수)",
      render: (field) => (
        <div className={styles.benefitInputBox}>
          <div className={styles.benefitInput}>
            <InputField
              value={formatNumberWithComma(field.value)}
              onChange={(e) => handleChangeNumberType(e, field)}
            />
          </div>
          <Text type="body3">회</Text>
          <LabeledCheckbox
            label="무제한"
            value={UNLIMITED_VALUE}
            isChecked={watch("amount") === UNLIMITED_VALUE}
            onToggle={() =>
              watch("amount") !== UNLIMITED_VALUE
                ? setValue("amount", UNLIMITED_VALUE)
                : setValue("amount", 0)
            }
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Card shadow="none" padding={20}>
        <form className={styles.benefitForm}>
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
        </form>
      </Card>
      <div className={styles.benefitControls}>
        <Button
          onClick={() => router.push("/coupons")}
          variant="outline"
          type="assistive"
        >
          목록
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          쿠폰 등록
        </Button>
      </div>
    </>
  );
}
