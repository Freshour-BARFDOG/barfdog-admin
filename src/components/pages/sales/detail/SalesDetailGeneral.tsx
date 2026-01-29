"use client";

import { useGetSalesDetailGeneral } from "@/api/sales/queries/useGetSalesDetailGeneral";
import OrderInfo from "./order/OrderInfo";
import {
  CANCELED_ORDER_STATUS_SET,
  ORDER_STATUS_LABEL_MAP,
} from "@/constants/sales";
import { salesDetailGridWrapper } from "./SalesDetail.css";
import CancelInfo from "./cancel/CancelInfo";
import OrderItemsInfo from "./orderItems/OrderItemsInfo";
import PaymentInfo from "./payment/PaymentInfo";
import DeliveryInfo from "./delivery/DeliveryInfo";

interface SalesDetailGeneralProps {
  orderId: number;
}

export default function SalesDetailGeneral({
  orderId,
}: SalesDetailGeneralProps) {
  const { data } = useGetSalesDetailGeneral(orderId);
  const isCanceled = CANCELED_ORDER_STATUS_SET.has(
    data.orderInfo.orderStatus
  );

  const orderStatus = ORDER_STATUS_LABEL_MAP[data.orderInfo.orderStatus];

  return (
    <div className={salesDetailGridWrapper}>
      <OrderInfo orderInfo={data.orderInfo} />
      {isCanceled && (
        <CancelInfo
          orderInfo={data.orderInfo}
          orderStatus={orderStatus}
        />
      )}
      <OrderItemsInfo
        orderItemList={data.orderItemList}
        title={isCanceled ? "취소상품" : "주문상품"}
      />
      <PaymentInfo paymentInfo={data.paymentInfo} />
      <DeliveryInfo
        orderId={data.orderInfo.orderId}
        deliveryInfo={data.deliveryInfo}
        orderConfirmDate={data.orderInfo.orderConfirmDate}
      />
    </div>
  );
}
