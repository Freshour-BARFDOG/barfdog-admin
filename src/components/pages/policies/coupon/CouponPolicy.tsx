"use client";

import { useUpdateCouponPolicy } from "@/api/policies/mutations/useUpdateCouponPolicy";
import { useGetAutoCoupons } from "@/api/policies/queries/useGetAutoCoupons";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import InputField from "@/components/common/inputField/InputField";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import { EVENT_COUPON_NAMES, GRADE_COUPON_NAMES } from "@/constants/policies";
import { useMutationToast } from "@/hooks/useMutaionToast";
import { commonWrapper } from "@/styles/common.css";
import { DiscountUnitType } from "@/types/common";
import { formatNumberWithComma } from "@/utils/formatNumber";
import { parseAndClampNumber } from "@/utils/parseAndClampNumber";
import { buildCouponPolicyPayload } from "@/utils/policies/buildCouponPolicyPayload";
import {
  autoCouponFormSchema,
  AutoCouponFormValues,
} from "@/utils/validation/policies/coupon";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const normalize = (str: string) => str.replace(/\s+/g, "");

export default function CouponPolicy() {
  const { data: coupons } = useGetAutoCoupons();
  const { mutate: updateCouponPolicy } = useUpdateCouponPolicy();
  const { gradeCoupons, eventCoupons } = useMemo(() => {
    const grade = coupons.filter((c) =>
      GRADE_COUPON_NAMES.includes(normalize(c.name))
    );
    const event = coupons.filter((c) =>
      EVENT_COUPON_NAMES.includes(normalize(c.name))
    );
    return { gradeCoupons: grade, eventCoupons: event };
  }, [coupons]);

  const { control, reset, handleSubmit } = useForm<AutoCouponFormValues>({
    defaultValues: { updateAutoCouponRequestDtoList: [] },
    resolver: yupResolver(autoCouponFormSchema),
  });

  const { fields } = useFieldArray({
    control,
    name: "updateAutoCouponRequestDtoList",
    keyName: "fieldId",
  });

  useEffect(() => {
    if (coupons.length) {
      const initial = [...gradeCoupons, ...eventCoupons].map((c) => ({
        id: c.id,
        discountDegree: c.discountDegree,
        availableMinPrice: c.availableMinPrice,
        discountType: c.discountType,
        name: c.name,
      }));
      reset({ updateAutoCouponRequestDtoList: initial });
    }
  }, [gradeCoupons, eventCoupons, coupons.length, reset]);

  const mutateToast = useMutationToast();

  const onSubmit = (values: AutoCouponFormValues) => {
    const updateAutoCouponRequestDtoList = buildCouponPolicyPayload(values);
    mutateToast(
      updateCouponPolicy,
      { updateAutoCouponRequestDtoList },
      "쿠폰 정책이 변경되었습니다.",
      "쿠폰 정책에 실패했습니다."
    );
  };

  return (
    <Card align="start" padding={20} gap={20} shadow="none">
      {fields.map((coupon, index) => {
        const unit = coupon.discountType === "FLAT_RATE" ? "원" : "%";

        return (
          <InputFieldGroup
            key={coupon.fieldId}
            label={coupon.name}
            divider={index !== fields.length - 1}
          >
            <div
              className={commonWrapper({
                gap: 12,
                justify: "start",
                wrap: "wrap",
              })}
            >
              <Controller
                control={control}
                name={`updateAutoCouponRequestDtoList.${index}.availableMinPrice`}
                render={({ field }) => (
                  <InputField
                    label="최소 주문 금액"
                    width={170}
                    unit="원"
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
              {/* 할인 금액 / 할인율 */}
              <Controller
                control={control}
                name={`updateAutoCouponRequestDtoList.${index}.discountDegree`}
                render={({ field }) => (
                  <InputField
                    label="할인율"
                    width={170}
                    unit={unit}
                    value={formatNumberWithComma(field.value)}
                    onChange={(e) => {
                      const num = parseAndClampNumber({
                        rawInput: e.target.value,
                        mode: "discount",
                        discountType: coupon.discountType as DiscountUnitType,
                      });
                      field.onChange(num);
                    }}
                  />
                )}
              />
            </div>
          </InputFieldGroup>
        );
      })}

      <Button onClick={handleSubmit(onSubmit)}>저장</Button>
    </Card>
  );
}
