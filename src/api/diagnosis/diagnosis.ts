import {
  DiagnosisStatus,
  ProbiomeDetailResponse,
  ProbiomeListParams,
  ProbiomeListResponse,
  UpdateProbiomeStatusResponse,
} from "@/types/diagnosis";
import axiosInstance from "../axiosInstance";
import { AxiosInstance } from "axios";

const getProbiomeList = async ({
  page = 0,
  size = 50,
  body,
}: ProbiomeListParams): Promise<ProbiomeListResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v2/admin/probiome-diagnoses/search?pageNum=${page}&pageSize=${size}`,
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

const getProbiomeDetail = async (
  diagnosisId: number,
  instance: AxiosInstance = axiosInstance
): Promise<ProbiomeDetailResponse> => {
  const { data } = await instance.get(
    `/api/v2/admin/probiome-diagnoses/${diagnosisId}`
  );
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

const updateProbiomeStatus = async ({
  diagnosisId,
  diagnosisStatus,
}: {
  diagnosisId: number;
  diagnosisStatus: DiagnosisStatus;
}): Promise<UpdateProbiomeStatusResponse> => {
  const { data } = await axiosInstance.put(
    `/api/v2/admin/probiome-diagnoses/${diagnosisId}/status`,
    { diagnosisStatus }
  );
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

// 아직 api 개발 안됨
const uploadProbiomeReport = async ({
  diagnosisId,
}: {
  diagnosisId: number;
}): Promise<UpdateProbiomeStatusResponse> => {
  const { data } = await axiosInstance.put(
    `/api/v2/admin/probiome-diagnoses/${diagnosisId}status`
  );
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

export {
  getProbiomeList,
  getProbiomeDetail,
  updateProbiomeStatus,
  uploadProbiomeReport,
};
