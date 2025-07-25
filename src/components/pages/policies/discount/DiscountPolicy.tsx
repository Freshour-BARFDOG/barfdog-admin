"use client";

import { useGetPlanDiscount } from "@/api/policies/queries/useGetPlanDiscount";
import { useUpdatePlanDiscount } from "@/api/policies/mutations/useUpdatePlanDiscount";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import InputField from "@/components/common/inputField/InputField";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import { PLAN_DISCOUNT_FIELDS } from "@/constants/policies";
import { useMutationToast } from "@/hooks/useMutaionToast";
import { commonWrapper } from "@/styles/common.css";
import {
  defaultDiscountPolicyFormValues,
  discountPolicyFormSchema,
  DiscountPolicyFormValues,
} from "@/utils/validation/policies/discount";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatNumberWithComma } from "@/utils/formatNumber";
import { parseAndClampNumber } from "@/utils/parseAndClampNumber";

export default function DiscountPolicy() {
  /* 데이터 로딩 */
  const { data: planDiscount } = useGetPlanDiscount();
  const { mutate: updatePlanDiscount } = useUpdatePlanDiscount();

  /* RHF 초기화 */
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscountPolicyFormValues>({
    defaultValues: defaultDiscountPolicyFormValues,
    resolver: yupResolver(discountPolicyFormSchema),
  });

  /* 서버 값 → 폼 값 reset */
  useEffect(() => {
    if (planDiscount) {
      const { full, half, topping } = planDiscount;
      reset({ full, half, topping });
    }
  }, [planDiscount, reset]);

  /* 공통 업데이트 핸들러 */
  const mutateToast = useMutationToast();
  const onSubmit = (values: DiscountPolicyFormValues) => {
    mutateToast(
      updatePlanDiscount,
      { body: values },
      "할인율 설정이 변경되었습니다.",
      "할인율 설정 변경에 실패했습니다."
    );
  };

  /* 렌더링 */
  return (
    <Card align="start" padding={20} gap={20} shadow="none">
      {/* 활동량 계수 */}

      <div
        className={commonWrapper({
          direction: "col",
          gap: 16,
          align: "start",
        })}
      >
        <div
          className={commonWrapper({
            direction: "col",
            gap: 4,
            align: "start",
          })}
        >
          <Text type="title4">플랜 할인율</Text>
          <Text type="caption" color="red">
            플랜 할인율 변경 시, 구독 중인 구독상품의 결제원금은 변경되지
            않습니다.
          </Text>
        </div>
        {PLAN_DISCOUNT_FIELDS.map(({ key, label }) => (
          <InputFieldGroup
            key={key}
            label={label}
            divider
            isLabelRequired={false}
          >
            <Controller
              control={control}
              name={key}
              render={({ field }) => (
                <InputField
                  width={140}
                  unit="%"
                  error={errors[key]?.message}
                  value={formatNumberWithComma(field.value)}
                  onChange={(e) => {
                    const num = parseAndClampNumber({
                      rawInput: e.target.value,
                      mode: "discount",
                      discountType: "FIXED_RATE",
                    });
                    field.onChange(num);
                  }}
                />
              )}
            />
          </InputFieldGroup>
        ))}
      </div>
      <Button onClick={handleSubmit(onSubmit)}>저장</Button>
    </Card>
  );
}
