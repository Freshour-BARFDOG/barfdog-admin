import {
  CreateGeneralProductRequest,
  GeneralProductDetailResponse,
  GeneralProductListParams,
  GeneralProductListResponse,
  GetAllianceListResponse,
  RecipeDetailResponse,
  RecipeListResponse,
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
  itemId: number,
  instance: AxiosInstance = axiosInstance
): Promise<GeneralProductDetailResponse> => {
  const { data } = await instance.get(`/api/admin/items/${itemId}`);
  return data;
};

const deleteGeneralProduct = async (itemId: number): Promise<any> => {
  const { data } = await axiosInstance.delete(`/api/admin/items/${itemId}`);
  return data;
};

const getRecipeList = async (): Promise<RecipeListResponse> => {
  const { data } = await axiosInstance.get("/api/recipes");
  return data._embedded.recipeListResponseDtoList;
};

const getIngredientList = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get("/api/recipes/ingredients");
  // TODO: 
  // 1. stringList 에서 allergenFoodList 로 변경 될 사항 확인 필요 (renewal서버: allergenFoodList / 운영서버: stringList)
  // 2. ENUM Type으로 적용 관련 논의 필요
  return data._embedded.stringList;
};

const getRecipeDetail = async (
  recipeId: number
): Promise<RecipeDetailResponse> => {
  const { data } = await axiosInstance.get(`/api/recipes/${recipeId}`);
  return data;
};

const makeRecipeFormData = (
  body: object,
  recipeFile: File | null,
  surveyFile: File | null
): FormData => {
  const formData = new FormData();
  formData.append(
    "requestDto",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );

  if (recipeFile) formData.append("file1", recipeFile);
  if (surveyFile) formData.append("file2", surveyFile);
  return formData;
};

const createRecipe = async ({
  body,
  recipeFile,
  surveyFile,
}: {
  body: object;
  recipeFile: File | null;
  surveyFile: File | null;
}) => {
  const formData = makeRecipeFormData(body, recipeFile, surveyFile);
  const { data } = await axiosInstance.post("/api/recipes", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const updateRecipe = async ({
  recipeId,
  body,
  recipeFile,
  surveyFile,
}: {
  recipeId: number;
  body: object;
  recipeFile: File | null;
  surveyFile: File | null;
}) => {
  const formData = makeRecipeFormData(body, recipeFile, surveyFile);
  const { data } = await axiosInstance.post(
    `/api/recipes/${recipeId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

const deleteRawProduct = async (recipeId: number): Promise<any> => {
  const { data } = await axiosInstance.put(`/api/recipes/${recipeId}/inactive`);
  return data;
};

export {
  getGeneralProductList,
  createGeneralProduct,
  getAllianceList,
  getGeneralProductDetail,
  updateGeneralProduct,
  deleteGeneralProduct,
  getRecipeList,
  getIngredientList,
  getRecipeDetail,
  createRecipe,
  updateRecipe,
  deleteRawProduct,
};
