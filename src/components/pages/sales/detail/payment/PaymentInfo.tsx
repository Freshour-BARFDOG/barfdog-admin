import { PaymentDetailInfo } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { PAYMENT_METHOD_LABEL_MAP } from "@/constants/sales";

interface PaymentInfoProps {
  paymentInfo: PaymentDetailInfo;
}

export default function PaymentInfo({ paymentInfo }: PaymentInfoProps) {
  const infoList = [
    {
      label: "총 상품금액",
      value: `${paymentInfo.orderPrice.toLocaleString()}원`,
    },
    {
      label: "총 결제 금액",
      value: `${paymentInfo.paymentPrice.toLocaleString()}원`,
    },
    {
      label: "등급할인",
      value: `${paymentInfo.discountGrade.toLocaleString()}원`,
    },
    {
      label: "쿠폰할인",
      value: `${paymentInfo.discountCoupon.toLocaleString()}원`,
    },
    {
      label: "적립금 사용",
      value: `${paymentInfo.discountReward.toLocaleString()}원`,
    },
    {
      label: "쿠폰 할인 소멸",
      value: `${paymentInfo.overDiscount.toLocaleString()}원`,
    },
    {
      label: "배송비",
      value: `${paymentInfo.deliveryPrice.toLocaleString()}원`,
    },
    {
      label: "결제방법",
      value: PAYMENT_METHOD_LABEL_MAP[paymentInfo.paymentMethod],
    },
  ];
  return <DetailTable items={infoList} columns={2} title="결제정보" />;
}
