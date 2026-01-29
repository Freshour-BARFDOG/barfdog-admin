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
import DeliveryInfo from "./delivery/DeliveryInfo";

interface SalesDetailSubscribeProps {
  orderId: number;
}

export default function SalesDetailSubscribe({
  orderId,
}: SalesDetailSubscribeProps) {
  const { data } = useGetSalesDetailSubscribe(orderId);
  const isCanceled = CANCELED_ORDER_STATUS_SET.has(
    data.orderInfo.orderStatus
  );
  const orderStatus = ORDER_STATUS_LABEL_MAP[data.orderInfo.orderStatus];
  return (
    <div className={salesDetailGridWrapper}>
      <OrderInfo orderInfo={data.orderInfo} />
      <PaymentInfo paymentInfo={data.paymentInfo} />
      {isCanceled && (
        <CancelInfo
          orderInfo={data.orderInfo}
          orderStatus={orderStatus}
        />
      )}
      <SubscribeInfo subscribeInfo={data.subscribeInfo} />
      <DeliveryInfo
        orderId={data.orderInfo.orderId}
        deliveryInfo={data.deliveryInfo}
        orderConfirmDate={data.orderInfo.orderConfirmDate}
      />
    </div>
  );
}
