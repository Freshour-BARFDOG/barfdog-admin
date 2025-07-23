import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";
import {
  SubscribeDetailResponse,
  SubscribeHistoryListResponse,
  SubscribeHistoryParams,
  UpdatePlanAndRecipeRequest,
} from "@/types/subscribe";

const getSubscribeHistory = async (
  { page, size, body }: SubscribeHistoryParams,
  instance: AxiosInstance = axiosInstance
): Promise<SubscribeHistoryListResponse> => {
  const { data } = await instance.get(
    `/api/admin/subscribes?page=${page}&size=${size}&memberName=${body.memberName}&dogName=${body.dogName}&email=${body.email}&id=${body.id}`
  );
  return {
    page: data.page,
    history: data?._embedded?.querySubscribeHistoryDtoList || [],
  };
};

const getSubscribeDetail = async (
  subscribeId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscribeDetailResponse> => {
  const { data } = await instance.get(`/api/subscribes/${subscribeId}`);
  return data;
};

const updatePlanAndRecipe = async ({
  subscribeId,
  body,
}: {
  subscribeId: number;
  body: UpdatePlanAndRecipeRequest;
}) => {
  const { data } = await axiosInstance.post(
    `/api/subscribes/${subscribeId}/planRecipes`,
    body
  );
  return data;
};

const updateNextPaymentPrice = async ({
  subscribeId,
  nextPaymentPrice,
}: {
  subscribeId: number;
  nextPaymentPrice: number;
}) => {
  const { data } = await axiosInstance.patch(
    `/api/admin/${subscribeId}/nextPaymentPrice`,
    { nextPaymentPrice }
  );
  return data;
};

const updateNextPaymentDate = async ({
  subscribeId,
  nextPaymentDate,
}: {
  subscribeId: number;
  nextPaymentDate: string;
}): Promise<any> => {
  const { data } = await axiosInstance.put(
    `/api/admin/nextPaymentDate/${subscribeId}`,
    {
      nextPaymentDate,
    }
  );
  return data;
};

const updateGrams = async ({
  subscribeId,
  grams,
}: {
  subscribeId: number;
  grams: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/api/admin/subscribes/${subscribeId}/oneMealGramsPerRecipe`,
    { grams }
  );
  return data;
};

export {
  getSubscribeHistory,
  getSubscribeDetail,
  updateNextPaymentDate,
  updatePlanAndRecipe,
  updateNextPaymentPrice,
  updateGrams,
};
