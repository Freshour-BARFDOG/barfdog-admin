import {
  CreateGeneralProductRequest,
  GeneralProductListParams,
  GeneralProductListResponse,
} from "@/types/products";
import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";

const getGeneralProductList = async (
  { page, size, itemType }: GeneralProductListParams,
  instance: AxiosInstance = axiosInstance
): Promise<GeneralProductListResponse> => {
  const { data } = await instance.get(
    `/api/admin/items?page=${page}&size=${size}&itemType=${itemType}`
  );
  return {
    page: data.page,
    items: data?._embedded?.queryItemsAdminDtoList || [],
  };
};

const createGeneralProduct = async (body: CreateGeneralProductRequest) => {
  const { data } = await axiosInstance.post("/api/admin/items", body);
  return data;
};

export { getGeneralProductList, createGeneralProduct };
