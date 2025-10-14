import {
  SearchSalesParams,
  SearchSalesResult,
  SearchSalesRequest,
  SalesDetailGeneralResponse,
  SalesDetailSubscribeResponse,
  UpdateSalesDeliveryRequest,
  OrderTypeResponse,
} from "@/types/sales";
import axiosInstance from "../axiosInstance";
import { AxiosInstance } from "axios";
import {
  ConfirmOrderRequest,
  RegisterDeliveryInfoResponse,
  RegisterDeliveryRequest,
} from "@/types/sales/orders";

const getSearchSales = async ({
  body,
  page = 0,
  size = 50,
}: SearchSalesParams): Promise<SearchSalesResult> => {
  const { data } = await axiosInstance.post(
    `/api/admin/orders/searchAll?page=${page}&size=${size}`,
    body
  );

  return {
    page: data.page,
    orders: data?._embedded?.queryAdminOrdersAllInfoDtoList || [],
  };
};

const excelDownloadSearchSales = async (
  body: SearchSalesRequest
): Promise<Blob> => {
  const { data } = await axiosInstance.post(
    "/api/admin/orders/searchAll/excel",
    body,
    { responseType: "blob", timeout: 50000 }
  );

  return data;
};

const getSalesDetailGeneral = async (
  orderId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SalesDetailGeneralResponse> => {
  const { data } = await instance.get(`/api/admin/orders/${orderId}/general`);

  return data;
};

const getSalesDetailSubscribe = async (
  orderId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SalesDetailSubscribeResponse> => {
  const { data } = await instance.get(`/api/admin/orders/${orderId}/subscribe`);

  return data;
};

interface UpdateSalesDeliveryParams {
  body: UpdateSalesDeliveryRequest;
  orderId: number;
}

const updateSalesDelivery = async ({
  body,
  orderId,
}: UpdateSalesDeliveryParams): Promise<any> => {
  const { data } = await axiosInstance.put(
    `/api/admin/deliveries/${orderId}/recipientAndRequest`,
    body
  );

  return data;
};

// ------- 주문 관리 ---------

const confirmOrder = async ({ orderType, body }: ConfirmOrderRequest) => {
  const { data } = await axiosInstance.post(
    `/api/admin/orders/${orderType}/orderConfirm`,
    body,
    {
      timeout: 60000,
    }
  );
  return data;
};

const unConfirmOrder = async ({
  orderType,
  orderIdList,
}: {
  orderType: OrderTypeResponse;
  orderIdList: number[];
}) => {
  const { data } = await axiosInstance.post(
    `/api/admin/orders/${orderType}/orderConfirmCancel`,
    { orderIdList },
    {
      timeout: 60000,
    }
  );
  return data;
};

const registerDeliveryInfo = async (
  body: RegisterDeliveryRequest
): Promise<RegisterDeliveryInfoResponse> => {
  const { data } = await axiosInstance.post("/api/admin/deliveries/info", body);
  return data._embedded.queryOrderInfoForDeliveryList;
};

const cancelOrderBySeller = async ({
  orderType,
  body,
}: {
  orderType: string;
  body: any;
}) => {
  const { data } = await axiosInstance.post(
    `/api/admin/orders/${orderType}/orderCancel`,
    body,
    {
      timeout: 60000,
    }
  );
  return data;
};
const forcedDeliveryComplete = async (orderIdList: number[]) => {
  const { data } = await axiosInstance.post(
    "/api/admin/deliveries/forcedDeliveryComplete",
    { orderIdList }
  );
  return data;
};

// ------ 취소 관리 --------

const confirmCancelRequest = async ({
  orderIdList,
  orderType,
}: {
  orderIdList: number[];
  orderType: OrderTypeResponse;
}) => {
  const { data } = await axiosInstance.post(
    `/api/admin/orders/${orderType}/cancelConfirm`,
    { orderIdList }
  );
  return data;
};

const rejectCancelRequest = async (orderIdList: number[]) => {
  const { data } = await axiosInstance.post(
    "/api/admin/orders/cancelRequest/reject",
    { orderIdList }
  );
  return data;
};

export {
  getSearchSales,
  excelDownloadSearchSales,
  getSalesDetailGeneral,
  getSalesDetailSubscribe,
  updateSalesDelivery,
  confirmOrder,
  unConfirmOrder,
  registerDeliveryInfo,
  cancelOrderBySeller,
  forcedDeliveryComplete,
  confirmCancelRequest,
  rejectCancelRequest,
};
