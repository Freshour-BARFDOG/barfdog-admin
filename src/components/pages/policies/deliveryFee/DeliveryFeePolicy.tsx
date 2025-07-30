"use client";

import { useUpdateDeliveryFeePolicy } from "@/api/policies/mutations/useUpdateDeliveryFeePolicy";
import { useGetPolicies } from "@/api/policies/queries/useGetPolicies";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import InputField from "@/components/common/inputField/InputField";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import { DELIVERY_FEE_FIELDS } from "@/constants/policies";
import { useMutationToast } from "@/hooks/useMutaionToast";
import { commonWrapper } from "@/styles/common.css";
import { formatNumberWithComma } from "@/utils/formatNumber";
import { parseAndClampNumber } from "@/utils/parseAndClampNumber";

import {
  defaultDeliveryFeePolicyFormValues,
  deliveryFeePolicyFormSchema,
  DeliveryFeePolicyFormValues,
} from "@/utils/validation/policies/delivery";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function DeliveryFeePolicy() {
  /* 데이터 로딩 */
  const { data: policies } = useGetPolicies();
  const { mutate: updateDeliveryFee } = useUpdateDeliveryFeePolicy();

  /* RHF 초기화 */
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryFeePolicyFormValues>({
    defaultValues: defaultDeliveryFeePolicyFormValues,
    resolver: yupResolver(deliveryFeePolicyFormSchema),
  });

  /* 서버 값 → 폼 값 reset */
  useEffect(() => {
    if (policies) {
      const { price, freeCondition } = policies.deliveryConstant;
      reset({ price, freeCondition });
    }
  }, [policies, reset]);

  /* 공통 업데이트 핸들러 */
  const mutateToast = useMutationToast();
  const onSubmit = (values: DeliveryFeePolicyFormValues) => {
    mutateToast(
      updateDeliveryFee,
      { body: values },
      "배송비 설정이 변경되었습니다.",
      "배송비 설정 변경에 실패했습니다."
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
        {DELIVERY_FEE_FIELDS.map(({ key, label }) => (
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
                  unit="원"
                  error={errors[key]?.message}
                  value={formatNumberWithComma(field.value)}
                  onChange={(e) => {
                    const num = parseAndClampNumber({
                      rawInput: e.target.value,
                      mode: "normal",
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
