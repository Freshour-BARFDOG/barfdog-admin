"use client";
import * as styles from "../../../Benefits.css";
import { discountUnitButton } from "@/styles/common.css";
import { ChangeEvent, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Controller, ControllerRenderProps } from "react-hook-form";
import Card from "@/components/common/card/Card";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import InputField from "@/components/common/inputField/InputField";
import Form from "@/components/common/form/Form";
import FormControls from "@/components/common/formControls/FormControls";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
  unformatCommaNumber,
  formatNumberWithComma,
} from "@/utils/formatNumber";
import { useCreateCoupon } from "@/api/coupons/mutations/useCreateCoupon";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import { CreateCouponFormValues } from "@/types/benefits/coupons";
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

type CreateCouponFieldName = keyof CreateCouponFormValues;

interface InputFieldItem {
  name: CreateCouponFieldName;
  label: string;
  render: (
    field: ControllerRenderProps<CreateCouponFormValues, CreateCouponFieldName>
  ) => ReactNode;
}

export default function CreateCouponForm() {
  const router = useRouter();
  const { control, handleSubmit, setValue, watch, isValid } =
    useFormHandler<CreateCouponFormValues>(
      createCouponSchema,
      defaultCreateCouponValues,
      "all"
    );

  const queryClient = useQueryClient();
  const { mutate } = useCreateCoupon();
  const { addToast } = useToastStore();

  const discountType = watch("discountType");
  const discountDegree = watch("discountDegree");

  useEffect(() => {
    if (discountType === "FIXED_RATE" && discountDegree > 100) {
      setValue("discountDegree", 100);
    }
  }, [discountType, discountDegree, setValue]);

  const handleChangeNumberType = (
    e: ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: number) => void }
  ) => {
    const raw = unformatCommaNumber(e.target.value);
    field.onChange(raw);
  };

  const onSubmit = (data: CreateCouponFormValues) => {
    mutate(
      {
        body: data,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [
              queryKeys.COUPONS.BASE,
              queryKeys.COUPONS.GET_COUPON_LIST,
              0,
              { couponType: data.couponType },
            ],
          });
          addToast("쿠폰 등록이 완료되었습니다!");
          setTimeout(() => {
            router.push(`/coupons?couponType=${data.couponType}`);
          }, 200);
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            const message =
              error?.response?.data?.errors?.[0]?.defaultMessage ??
              "쿠폰 등록에 실패했습니다.\n관리자에게 문의해주세요.";
            addToast(message);
          } else {
            addToast("알 수 없는 에러가 발생했습니다.");
          }
        },
      }
    );
  };

  const InputFieldList: InputFieldItem[] = [
    {
      name: "couponType",
      label: "쿠폰 타입",
      render: (field) => (
        <LabeledRadioButtonGroup
          value={field.value ?? ""}
          onChange={(value) => {
            field.onChange(value);
            if (value === "GENERAL_PUBLISHED") {
              setValue("code", "");
            }
          }}
          options={CREATE_COUPON_TYPE_LIST}
        />
      ),
    },
    {
      name: "name",
      label: "쿠폰 이름",
      render: (field) => (
        <InputField value={field.value} onChange={field.onChange} />
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
          <div className={styles.benefitInput({})}>
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
          <div className={styles.benefitInput({})}>
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
                  setValue("discountType", unit.value);
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
          <div className={styles.benefitInput({})}>
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
          <div className={styles.benefitInput({})}>
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
          <div className={styles.benefitInput({})}>
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
        <Form>
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
        </Form>
      </Card>
      <FormControls
        cancelText="목록"
        confirmText="쿠폰 등록"
        onCancel={() => router.push("/coupons")}
        onConfirm={handleSubmit(onSubmit)}
        isConfirmDisabled={!isValid}
      />
    </>
  );
}
