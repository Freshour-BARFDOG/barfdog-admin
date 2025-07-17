import {
  CreateGeneralProductRequest,
  GeneralProductDetailResponse,
  GeneralProductListParams,
  GeneralProductListResponse,
  GetAllianceListResponse,
  GetRecipeListResponse,
  UpdateGeneralProductRequest,
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

const updateGeneralProduct = async ({
  itemId,
  body,
}: {
  itemId: number;
  body: UpdateGeneralProductRequest;
}) => {
  const { data } = await axiosInstance.put(`/api/admin/items/${itemId}`, body);
  return data;
};

const getAllianceList = async (): Promise<GetAllianceListResponse[]> => {
  const { data } = await axiosInstance.get("/api/admin/alliance");
  return data?._embedded?.allianceResponseList;
};

const getGeneralProductDetail = async (
  itemId: number
): Promise<GeneralProductDetailResponse> => {
  const { data } = await axiosInstance.get(`/api/admin/items/${itemId}`);
  return data;
};

const deleteGeneralProduct = async (itemId: number): Promise<any> => {
  const { data } = await axiosInstance.delete(`/api/admin/items/${itemId}`);
  return data;
};

const getRecipeList = async (): Promise<GetRecipeListResponse> => {
  const { data } = await axiosInstance.get("/api/recipes");
  return data._embedded.recipeListResponseDtoList;
};

export {
  getGeneralProductList,
  createGeneralProduct,
  getAllianceList,
  getGeneralProductDetail,
  updateGeneralProduct,
  deleteGeneralProduct,
  getRecipeList,
};
