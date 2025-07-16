import {
  AllianceDto,
  CreateGeneralProductRequest,
  GeneralProductListParams,
  GeneralProductListResponse,
  GetAllianceListResponse,
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

const getAllianceList = async (): Promise<GetAllianceListResponse[]> => {
  const { data } = await axiosInstance.get("/api/admin/alliance");
  return data?._embedded?.allianceResponseList;
};

export { getGeneralProductList, createGeneralProduct, getAllianceList };
