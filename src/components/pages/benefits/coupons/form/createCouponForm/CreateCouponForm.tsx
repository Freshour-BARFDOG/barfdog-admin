"use client";
import {commonWrapper, pointColor} from "@/styles/common.css";
import { ChangeEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Controller, ControllerRenderProps, useWatch } from "react-hook-form";
import Card from "@/components/common/card/Card";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import DiscountControl from "@/components/common/discountControl/DiscountControl";
import LabeledInput from "@/components/common/labeledInput/LabeledInput";
import InputField from "@/components/common/inputField/InputField";
import Form from "@/components/common/form/Form";
import FormControls from "@/components/common/formControls/FormControls";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import { useFormHandler } from "@/hooks/useFormHandler";
import { unformatCommaNumber, formatNumberWithComma } from "@/utils/formatNumber";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import { CREATE_COUPON_TARGET_LIST, CREATE_COUPON_TYPE_LIST } from "@/constants/benefits/coupons";
import { DISCOUNT_UNIT_TYPE_LIST, UNLIMITED_VALUE } from "@/constants/common";
import { createCouponSchema, defaultCreateCouponValues } from "@/utils/validation/benefits/coupon/createCoupon";
import { CreateCouponFormValues, CreateCouponType } from "@/types/benefits/coupons";
import { useCreateCoupon } from "@/api/coupons/mutations/useCreateCoupon";

type CreateCouponFieldName = keyof CreateCouponFormValues;

interface InputFieldItem {
  name: CreateCouponFieldName;
  label: string | ReactNode;
  isRequired?: boolean;
  render: (
    field: ControllerRenderProps<CreateCouponFormValues, CreateCouponFieldName>
  ) => ReactNode;
}

export default function CreateCouponForm() {
  const router = useRouter();
  const { control, handleSubmit, setValue, isValid } =
    useFormHandler<CreateCouponFormValues>(
      createCouponSchema,
      defaultCreateCouponValues,
      "all"
    );

  const queryClient = useQueryClient();
  const { mutate } = useCreateCoupon();
  const { addToast } = useToastStore();

  const discountType = useWatch({ control, name: "discountType" });
  const couponType = useWatch({ control, name: "couponType" });
  const amount = useWatch({ control, name: "amount" });

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
          router.push(`/coupons?couponType=${data.couponType}`);
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
      label: (
        <TooltipInfo
          title={(
            <>쿠폰 타입 <span className={pointColor}>*</span></>
          )}
        >
          '프로모션' 타입: 프로모션 생성 페이지에서 발급 가능
        </TooltipInfo>
      ),
      isRequired: false,
      render: (field) => (
        <LabeledRadioButtonGroup
          value={field.value ?? ""}
          onChange={(value) => {
            field.onChange(value);
            if (value === "GENERAL_PUBLISHED") {
              setValue("code", "", { shouldValidate: true });
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
        <InputField
          width={170}
          value={field.value}
          onChange={field.onChange}
          disabled={couponType as CreateCouponType === "GENERAL_PUBLISHED"}
        />
      ),
    },
    {
      name: "discountDegree",
      label: (
        <TooltipInfo
          title={(
            <>할인율 <span className={pointColor}>*</span></>
          )}
        >
          쿠폰코드 규칙<br/>
          1. 문자열 15자 이내 (영문 대소문자)<br/>
          2. 회원 마이페이지에서 쿠폰코드 후 사용가능<br/>
          3. 동일한 쿠폰에 대하여 1회 사용가능<br/>
          4. 공란으로 입력하면 일반쿠폰이 생성
        </TooltipInfo>
      ),
      isRequired: false,
      render: (field) => (
        <DiscountControl
          value={field.value as number}
          onValueChange={field.onChange}
          options={DISCOUNT_UNIT_TYPE_LIST}
          selected={discountType}
          onToggleChange={(value) => {
            setValue('discountType', value);
          }}
          discountType={discountType}
        />
      ),
    },
    {
      name: "availableMaxDiscount",
      label: "최대 할인 금액",
      render: (field) => (
        <LabeledInput label='원 할인'>
          <InputField
            width={170}
            value={formatNumberWithComma(field.value)}
            onChange={(e) => handleChangeNumberType(e, field)}
          />
        </LabeledInput>
      ),
    },
    {
      name: "availableMinPrice",
      label: "최소 사용 금액",
      render: (field) => (
        <LabeledInput label='원 이상'>
          <InputField
            width={170}
            value={formatNumberWithComma(field.value)}
            onChange={(e) => handleChangeNumberType(e, field)}
          />
        </LabeledInput>
      ),
    },
    {
      name: "amount",
      label: (
        <TooltipInfo
          title={(
            <>사용한도(횟수) <span className={pointColor}>*</span></>
          )}
        >
          사용한도가 9999회 이상일 경우, 무제한 체크박스를 활용하세요.
        </TooltipInfo>
      ),
      isRequired: false,
      render: (field) => (
        <div className={commonWrapper({ align: 'center', justify: 'start', gap: 8 })}>
          <LabeledInput label='회'>
            <InputField
              width={170}
              value={formatNumberWithComma(field.value)}
              onChange={(e) => handleChangeNumberType(e, field)}
            />
          </LabeledInput>
          <LabeledCheckbox
            label="무제한"
            value={UNLIMITED_VALUE}
            isChecked={amount as number === UNLIMITED_VALUE}
            onToggle={() =>
              amount as number !== UNLIMITED_VALUE
                ? setValue("amount", UNLIMITED_VALUE, { shouldValidate: true })
                : setValue("amount", 0, { shouldValidate: true })
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
              render={({ field }) => {
                const isLabelRequired = input.isRequired === undefined ? true : input.isRequired;
                return (
                  <InputFieldGroup
                    label={input.label}
                    isLabelRequired={isLabelRequired}
                    divider={index !== InputFieldList.length - 1}
                  >
                    {input.render(field)}
                  </InputFieldGroup>
                )
              }}
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
