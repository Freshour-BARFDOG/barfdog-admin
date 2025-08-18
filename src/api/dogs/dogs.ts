import {
  DogDetailResponse,
  DogListResponse,
  DogListParams,
  DogListRequest,
} from "@/types/dog";
import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";

const getDogList = async (
  { page, size, body }: DogListParams,
  instance: AxiosInstance = axiosInstance
): Promise<DogListResponse> => {
  const isDeleted = body.isDeleted !== null ? body.isDeleted : "";
  const { data } = await instance.get(
    `/api/admin/dogs?page=${page}&size=${size}&memberName=${body.memberName}&dogName=${body.dogName}&memberEmail=${body.memberEmail}&subscribeStatus=${body.subscribeStatus}&isDeleted=${isDeleted}`
  );
  return {
    page: data.page,
    dogs: data?._embedded?.queryDogWithMemberAndSubscribeDtoList || [],
  };
};
const getDogDetail = async (
  dogId: number,
  instance: AxiosInstance = axiosInstance
): Promise<DogDetailResponse> => {
  const { data } = await instance.get(`/api/dogs/${dogId}`);
  return data;
};

const excelDownloadDogs = async (body: DogListRequest): Promise<Blob> => {
  const { data } = await axiosInstance.post(
    "/api/admin/dogs/excel-download",
    body,
    { responseType: "blob", timeout: 50000 }
  );

  return data;
};

export { getDogList, getDogDetail, excelDownloadDogs };
