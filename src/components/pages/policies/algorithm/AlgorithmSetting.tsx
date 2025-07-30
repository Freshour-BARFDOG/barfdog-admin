"use client";

import { useUpdateAlgorithmSetting } from "@/api/policies/mutations/useUpdateAlgorithmSetting";
import { useGetPolicies } from "@/api/policies/queries/useGetPolicies";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import InputField from "@/components/common/inputField/InputField";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import {
  ACTIVITY_FIELDS,
  SNACK_FIELDS,
  STANDARD_FIELDS,
} from "@/constants/policies";
import { useMutationToast } from "@/hooks/useMutaionToast";
import { commonWrapper } from "@/styles/common.css";
import { buildAlgorithmSettingPayload } from "@/utils/policies/buildAlgorithmSettingPayload";
import {
  algorithmSettingFormSchema,
  AlgorithmSettingFormValues,
  defaultAlgorithmSettingFormValues,
} from "@/utils/validation/policies/algorithm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function AlgorithmSetting() {
  /* 데이터 로딩 */
  const { data: policies } = useGetPolicies();
  const { mutate: updateAlgorithmSetting } = useUpdateAlgorithmSetting();

  /* RHF 초기화 */
  const { control, reset, handleSubmit } = useForm<AlgorithmSettingFormValues>({
    defaultValues: defaultAlgorithmSettingFormValues,
    resolver: yupResolver(algorithmSettingFormSchema),
  });

  /* 서버 값 → 폼 값 reset */
  useEffect(() => {
    if (policies) {
      const { activityConstant, snackConstant, standardVar } = policies;
      reset({ activityConstant, snackConstant, standardVar });
    }
  }, [policies, reset]);

  /* 공통 업데이트 핸들러 */
  const mutateToast = useMutationToast();
  const onSubmit = (values: AlgorithmSettingFormValues) => {
    const body = buildAlgorithmSettingPayload(values);
    mutateToast(
      updateAlgorithmSetting,
      { body },
      "알고리즘 설정이 변경되었습니다.",
      "알고리즘 설정 변경에 실패했습니다."
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
        <Text type="title4">활동량 상수</Text>
        {ACTIVITY_FIELDS.map(({ key, label }) => (
          <InputFieldGroup
            key={key}
            label={label}
            divider
            isLabelRequired={false}
          >
            <Controller
              control={control}
              name={`activityConstant.${key}` as const}
              render={({ field }) => (
                <InputField type="number" width={140} unit="%" {...field} />
              )}
            />
          </InputFieldGroup>
        ))}
      </div>

      {/* 간식 계수 */}
      <div
        className={commonWrapper({
          direction: "col",
          gap: 16,
          align: "start",
        })}
      >
        <Text type="title4">간식량 상수</Text>
        {SNACK_FIELDS.map(({ key, label }) => (
          <InputFieldGroup
            key={key}
            label={label}
            divider
            isLabelRequired={false}
          >
            <Controller
              control={control}
              name={`snackConstant.${key}` as const}
              render={({ field }) => (
                <InputField type="number" width={140} {...field} unit="%" />
              )}
            />
          </InputFieldGroup>
        ))}
      </div>

      {/* 표준 가중치 계수 */}
      <div
        className={commonWrapper({
          direction: "col",
          gap: 16,
          align: "start",
        })}
      >
        <Text type="title4">반려견 상태 상수</Text>
        {STANDARD_FIELDS.map(({ key, label }) => (
          <InputFieldGroup
            key={key}
            label={label}
            divider
            isLabelRequired={false}
          >
            <Controller
              key={key}
              control={control}
              name={`standardVar.${key}` as const}
              render={({ field }) => (
                <InputField type="number" width={140} {...field} />
              )}
            />
          </InputFieldGroup>
        ))}
      </div>

      <Button onClick={handleSubmit(onSubmit)}>저장</Button>
    </Card>
  );
}
