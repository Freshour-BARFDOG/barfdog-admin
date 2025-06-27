"use client";

import { useGetSalesDetailGeneral } from "@/api/sales/queries/useGetSalesDetailGeneral";
import OrderInfo from "./order/OrderInfo";
import { commonWrapper } from "@/styles/common.css";

interface SalesDetailGeneralProps {
  orderId: number;
}

export default function SalesDetailGeneral({
  orderId,
}: SalesDetailGeneralProps) {
  const { data } = useGetSalesDetailGeneral(orderId);
  console.log("data", data);

  return (
    <div
      className={commonWrapper({ direction: "col", gap: 20, justify: "start" })}
    >
      <OrderInfo />
    </div>
  );
}
