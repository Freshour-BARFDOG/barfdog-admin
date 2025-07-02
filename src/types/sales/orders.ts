import { OrderTypeResponse } from "../sales";

type ConfirmOrderBody = {
  orderItemIdList?: number[];
  orderIdList?: number[];
};

interface ConfirmOrderRequest {
  orderType: OrderTypeResponse;
  body: ConfirmOrderBody;
}

interface RegisterDeliveryRequest {
  orderList: Array<{
    orderId: number;
    selectOptionList:
      | { selectOptionId: number; selectOptionAmount: number }[]
      | null;
  }>;
}

/** 개별 주문 아이템 정보 */
interface DeliveryOrderItem {
  uniqueCd: string;
  ordNo: string;
  itemName: string;
  itemQty: number;
  ordDate: string;
}

interface TransportInfo {
  transUniqueCd: string;
  sndName: string;
  sndZipCode: string;
  sndAddr1: string;
  sndAddr2: string;
  sndTel1: string;
  rcvName: string;
  rcvZipCode: string;
  rcvAddr1: string;
  rcvAddr2: string;
  rcvTel1: string;
  mallId: string;
}

interface RegisterDeliveryInfo extends TransportInfo {
  request: string | null;
  orderItems: DeliveryOrderItem[];
}

type RegisterDeliveryInfoResponse = RegisterDeliveryInfo[];

interface GoodsFlowOrderItem extends TransportInfo {
  msgToTrans: string | null;
  status: string;
  paymentTypeCode: string;
  orderItems: DeliveryOrderItem[];
}

interface GoodsFlowOrderRegisterRequest {
  items: GoodsFlowOrderItem[];
}

interface GoodsFlowOrderRegisterResponse {
  apiVersion: string;
  method: string;
  success: boolean;
  id: string;
  data: null;
  error: {
    status: number;
    message: string | null;
    detail: string | null;
  };
  context: any | null;
}

export type {
  RegisterDeliveryRequest,
  RegisterDeliveryInfoResponse,
  ConfirmOrderBody,
  ConfirmOrderRequest,
  GoodsFlowOrderRegisterRequest,
  GoodsFlowOrderRegisterResponse,
};
