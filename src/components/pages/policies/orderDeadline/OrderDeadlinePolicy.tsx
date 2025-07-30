"use client";

import { useUpdateOrderDeadline } from "@/api/policies/mutations/useUpdateOrderDeadline";
import { useGetPolicies } from "@/api/policies/queries/useGetPolicies";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import {
  ORDER_DEADLINE_OPTIONS,
} from "@/constants/policies";
import { useMutationToast } from "@/hooks/useMutaionToast";
import { commonWrapper } from "@/styles/common.css";
import { OrderDeadline } from "@/types/policies";

import { useState } from "react";

export default function OrderDeadlinePolicy() {
  /* 데이터 로딩 */
  const { data: policies } = useGetPolicies();
  const { mutate: updateOrderDeadline } = useUpdateOrderDeadline();

  const [orderDeadline, setOrderDeadline] = useState<OrderDeadline>(
    policies.orderDeadline
  );

  /* 공통 업데이트 핸들러 */
  const mutateToast = useMutationToast();

  const onSubmit = () => {
    mutateToast(
      updateOrderDeadline,
      { orderDeadline },
      "배송비 설정이 변경되었습니다.",
      "배송비 설정 변경에 실패했습니다."
    );
  };

  /* 렌더링 */
  return (
    <Card align="center" padding={20} gap={20} shadow="none">
      {/* 활동량 계수 */}
      <div
        className={commonWrapper({
          direction: "col",
          gap: 16,
          align: "start",
        })}
      >
        <InputFieldGroup label="주문 마감일 변경" isLabelRequired={false}>
          <LabeledRadioButtonGroup
            options={ORDER_DEADLINE_OPTIONS}
            value={orderDeadline}
            onChange={(value) => setOrderDeadline(value)}
          />
        </InputFieldGroup>
      </div>
      <Button onClick={onSubmit}>저장</Button>
    </Card>
  );
}
