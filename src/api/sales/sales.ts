import {
  SearchSalesParams,
  SearchSalesResult,
  SearchSalesRequest,
  SalesDetailGeneralResponse,
  SalesDetailSubscribeResponse,
  UpdateSalesDeliveryRequest,
  OrderTypeResponse,
  SearchSalesData,
} from "@/types/sales";
import { Pagination } from "@/types/common";
import axiosInstance from "../axiosInstance";
import { AxiosInstance } from "axios";
import {
  RegisterDeliveryInfoResponse,
  RegisterDeliveryRequest,
} from "@/types/sales/orders";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

interface SearchSalesApiResponse {
  pagination: Pagination;
  orderList: SearchSalesData[];
}

const getSearchSales = async ({
  body,
  page = 0,
  size = 50,
}: SearchSalesParams): Promise<SearchSalesResult> => {
  const { data } = await axiosInstance.post(
    `api/v2/admin/orders?page=${page}&size=${size}`,
    body,
  );

  const responseData = validateApiResponse<SearchSalesApiResponse>(data);

  return {
    pagination: responseData.pagination,
    orders: responseData.orderList || [],
  };
};

const excelDownloadSearchSales = async (
  body: SearchSalesRequest,
): Promise<Blob> => {
  const { data } = await axiosInstance.post(
    "/api/v2/admin/orders/export",
    body,
    { responseType: "blob", timeout: 100000 },
  );

  return data;
};

const getSalesDetailGeneral = async (
  orderId: number,
  instance: AxiosInstance = axiosInstance,
): Promise<SalesDetailGeneralResponse> => {
  const { data } = await instance.get(
    `/api/v2/admin/orders/general/${orderId}`,
  );

  return validateApiResponse<SalesDetailGeneralResponse>(data);
};

const getSalesDetailSubscribe = async (
  orderId: number,
  instance: AxiosInstance = axiosInstance,
): Promise<SalesDetailSubscribeResponse> => {
  const { data } = await instance.get(
    `/api/v2/admin/orders/subscribe/${orderId}`,
  );

  return validateApiResponse<SalesDetailSubscribeResponse>(data);
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
    body,
  );

  return data;
};

// ------- 주문 관리 ---------

const confirmOrder = async (orderIdList: number[]) => {
  const { data } = await axiosInstance.put(
    "/api/v2/admin/orders/fulfill",
    { orderIdList },
    {
      timeout: 60000,
    },
  );
  return validateApiResponse(data);
};

const unConfirmOrder = async (orderIdList: number[]) => {
  const { data } = await axiosInstance.put(
    "/api/v2/admin/orders/unfulfill",
    { orderIdList },
    {
      timeout: 60000,
    },
  );
  return validateApiResponse(data);
};

const registerDeliveryInfo = async (
  body: RegisterDeliveryRequest,
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
    },
  );
  return data;
};
const forcedDeliveryComplete = async (orderIdList: number[]) => {
  const { data } = await axiosInstance.post(
    "/api/admin/deliveries/forcedDeliveryComplete",
    { orderIdList },
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
    { orderIdList },
  );
  return data;
};

const rejectCancelRequest = async (orderIdList: number[]) => {
  const { data } = await axiosInstance.post(
    "/api/admin/orders/cancelRequest/reject",
    { orderIdList },
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
