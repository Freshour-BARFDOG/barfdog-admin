import { OrderDetailInfo } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { ORDER_TYPE_LABEL_MAP } from "@/constants/sales";

interface OrderInfoProps {
  orderInfo: OrderDetailInfo;
}

export default function OrderInfo({ orderInfo }: OrderInfoProps) {
  const infoList = [
    { label: "주문번호", value: orderInfo.merchantUid },
    {
      label: "주문(결제)일시",
      value: new Date(orderInfo.paymentDate).toLocaleString(),
    },
    { label: "주문유형", value: ORDER_TYPE_LABEL_MAP[orderInfo.orderType] },
    { label: "묶음배송여부", value: orderInfo.package ? "Y" : "N" },
    { label: "구매자명", value: orderInfo.memberName },
    { label: "연락처", value: orderInfo.memberPhoneNumber },
    { label: "구매자ID", value: orderInfo.memberEmail ?? "-" },
  ];
  return <DetailTable items={infoList} columns={2} title="주문정보" />;
}
