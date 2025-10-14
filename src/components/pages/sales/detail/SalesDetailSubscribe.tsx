"use client";

import { useGetSalesDetailSubscribe } from "@/api/sales/queries/useGetSalesDetailSubscribe";
import OrderInfo from "./order/OrderInfo";
import {
  CANCELED_ORDER_STATUS_SET,
  ORDER_STATUS_LABEL_MAP,
} from "@/constants/sales";
import { salesDetailGridWrapper } from "./SalesDetail.css";
import PaymentInfo from "./payment/PaymentInfo";
import CancelInfo from "./cancel/CancelInfo";
import SubscribeInfo from "./subscribe/SubscribeInfo";
import DogInfo from "./dog/DogInfo";
import DeliveryInfo from "./delivery/DeliveryInfo";

interface SalesDetailSubscribeProps {
  orderId: number;
}

export default function SalesDetailSubscribe({
  orderId,
}: SalesDetailSubscribeProps) {
  const { data } = useGetSalesDetailSubscribe(orderId);
  const isCanceled = CANCELED_ORDER_STATUS_SET.has(
    data.subscribePaymentDto.orderStatus
  );
  const orderStatus =
    ORDER_STATUS_LABEL_MAP[data.subscribePaymentDto.orderStatus];
  return (
    <div className={salesDetailGridWrapper}>
      <OrderInfo orderInfoDto={data.subscribeOrderInfoDto} />
      <PaymentInfo paymentDto={data.subscribePaymentDto} />
      {isCanceled && (
        <CancelInfo
          orderInfoDto={data.subscribeOrderInfoDto}
          orderStatus={orderStatus}
        />
      )}
      <SubscribeInfo subscribeDto={data.subscribeDto} />
      <DogInfo dogDto={data.dogDto} />
      <DeliveryInfo
        orderId={data.subscribeOrderInfoDto.id}
        deliveryDto={data.subscribeDeliveryDto}
        orderConfirmDate={data.subscribePaymentDto.orderConfirmDate}
      />
    </div>
  );
}
