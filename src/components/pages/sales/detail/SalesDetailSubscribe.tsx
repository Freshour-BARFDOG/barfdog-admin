"use client";

import { useGetSalesDetailSubscribe } from "@/api/sales/queries/useGetSalesDetailSubscribe";

interface SalesDetailSubscribeProps {
  orderId: number;
}

export default function SalesDetailSubscribe({
  orderId,
}: SalesDetailSubscribeProps) {
  const { data } = useGetSalesDetailSubscribe(orderId);
  console.log("data", data);

  return (
    <>
      <></>
    </>
  );
}
