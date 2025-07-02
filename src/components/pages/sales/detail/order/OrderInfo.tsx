import { OrderInfoDto } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { ORDER_TYPE_LABEL_MAP } from "@/constants/sales";

interface OrderInfoProps {
  orderInfoDto: OrderInfoDto;
}

export default function OrderInfo({ orderInfoDto }: OrderInfoProps) {
  const infoList = [
    { label: "주문번호", value: orderInfoDto.merchantUid },
    {
      label: "주문(결제)일시",
      value: new Date(orderInfoDto.orderDate).toLocaleString(),
    },
    { label: "주문유형", value: ORDER_TYPE_LABEL_MAP[orderInfoDto.orderType] },
    { label: "묶음배송여부", value: orderInfoDto.package ? "Y" : "N" },
    { label: "구매자명", value: orderInfoDto.memberName },
    { label: "연락처", value: orderInfoDto.phoneNumber },
    { label: "구매자ID", value: orderInfoDto.email },
    {
      label: "구독회원",
      value: orderInfoDto.subscribe ? "Y" : "N",
    },
  ];
  return <DetailTable items={infoList} columns={2} title="주문정보" />;
}
