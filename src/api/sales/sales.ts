import {
  SearchSalesParams,
  SearchSalesResult,
  SearchSalesRequest,
  SalesDetailGeneralResponse,
  SalesDetailSubscribeResponse,
} from "@/types/sales";
import axiosInstance from "../axiosInstance";

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
    { responseType: "blob" }
  );

  return data;
};

const getSalesDetailGeneral = async (
  orderId: number
): Promise<SalesDetailGeneralResponse> => {
  const { data } = await axiosInstance.get(
    `/api/admin/orders/${orderId}/general`
  );

  return data;
};

const getSalesDetailSubscribe = async (
  orderId: number
): Promise<SalesDetailSubscribeResponse> => {
  const { data } = await axiosInstance.get(
    `/api/admin/orders/${orderId}/subscribe`
  );

  return data;
};

export {
  getSearchSales,
  excelDownloadSearchSales,
  getSalesDetailGeneral,
  getSalesDetailSubscribe,
};
