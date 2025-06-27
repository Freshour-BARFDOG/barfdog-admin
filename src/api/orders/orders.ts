import { SearchOrdersParams, SearchOrdersResult } from "@/types/orders";
import axiosInstance from "../axiosInstance";

const searchOrders = async ({
  body,
  page = 0,
  size = 50,
}: SearchOrdersParams): Promise<SearchOrdersResult> => {
  const { data } = await axiosInstance.post(
    `/api/admin/orders/searchAll?page=${page}&size=${size}`,
    body
  );

  return {
    page: data.page,
    orders: data?._embedded?.queryAdminOrdersAllInfoDtoList || [],
  };
};

export { searchOrders };
