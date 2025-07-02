import Card from "@/components/common/card/Card";
import {
  GeneralPaymentDto,
  OrderInfoDto,
  SubscribePaymentDto,
} from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import {
  ORDER_STATUS_LABEL_MAP,
  PAYMENT_METHOD_LABEL_MAP,
} from "@/constants/sales";

interface PaymentInfoProps {
  paymentDto: GeneralPaymentDto | SubscribePaymentDto;
}

export default function PaymentInfo({ paymentDto }: PaymentInfoProps) {
  const infoList = [
    {
      label: "총 상품금액",
      value: `${paymentDto.orderPrice.toLocaleString()}원`,
    },
    {
      label: "총 결제 금액",
      value: `${paymentDto.paymentPrice.toLocaleString()}원`,
    },
    {
      label: "등급할인",
      value: `${paymentDto.discountGrade.toLocaleString()}원`,
    },
    {
      label: "쿠폰할인",
      value: `${paymentDto.discountCoupon.toLocaleString()}원`,
    },
    {
      label: "적립금 사용",
      value: `${paymentDto.discountReward.toLocaleString()}원`,
    },
    {
      label: "쿠폰 할인 소멸",
      value: `${paymentDto.overDiscount.toLocaleString()}원`,
    },
    {
      label: "배송비",
      value: `${paymentDto.deliveryPrice.toLocaleString()}원`,
    },
    {
      label: "결제방법",
      value: PAYMENT_METHOD_LABEL_MAP[paymentDto.paymentMethod],
    },
    {
      label: "처리상태",
      value: ORDER_STATUS_LABEL_MAP[paymentDto.orderStatus],
      fullWidth: true,
    },
  ];
  return <DetailTable items={infoList} columns={2} title="결제정보" />;
}
