import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";
import {
  SubscribeHistoryListResponse,
  SubscribeHistoryParams,
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

export { getSubscribeHistory };
