import Card from "@/components/common/card/Card";
import { OrderInfoDto } from "@/types/sales";
import * as styles from "./OrderInfo.css";
import React from "react";

interface OrderInfoProps {
  orderInfoDto: OrderInfoDto;
}

export default function OrderInfo({ orderInfoDto }: OrderInfoProps) {
  const infoList: { label: string; value: React.ReactNode }[] = [
    { label: "주문번호", value: orderInfoDto.merchantUid },
    {
      label: "주문(결제)일시",
      value: new Date(orderInfoDto.orderDate).toLocaleString(),
    },
    { label: "주문유형", value: orderInfoDto.orderType },
    { label: "묶음배송여부", value: orderInfoDto.package ? "Y" : "N" },
    { label: "구매자명", value: orderInfoDto.memberName },
    { label: "연락처", value: orderInfoDto.phoneNumber },
    { label: "구매자ID", value: orderInfoDto.email },
    { label: "구독회원", value: orderInfoDto.subscribe ? "Y" : "N" },
    // 필요하다면 더 추가…
  ];
  return (
    <Card shadow="light">
      <dl className={styles.infoList}>
        {infoList.map(({ label, value }) => (
          <React.Fragment key={label}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </Card>
  );
}
