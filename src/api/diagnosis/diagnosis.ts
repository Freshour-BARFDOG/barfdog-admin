import {
  DiagnosisStatus,
  ProbiomeDetailResponse,
  DiagnosisKitListResponse,
  ProbiomeListParams,
  ProbiomeListResponse,
  UpdateProbiomeStatusResponse,
  CreateDiagnosisKitsRequest,
  CreateDiagnosisKitsResponse,
  ProbiomeReportUploadResponse,
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

const getDiagnosisKitList = async ({
  page = 0,
  size = 50,
}: {
  page: number;
  size: number;
}): Promise<DiagnosisKitListResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v2/admin/diagnosis-kit-groups?pageNum=${page}&pageSize=${size}`
  );
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

// 진단 키트 그룹 생성
const createDiagnosisKits = async ({
  body,
}: {
  body: CreateDiagnosisKitsRequest;
}): Promise<CreateDiagnosisKitsResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v2/admin/diagnosis-kit-groups`,
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

const excelDownloadDiagnosisKits = async (
  kitGroupId: number
): Promise<Blob> => {
  const { data } = await axiosInstance.put(
    `/api/v2/admin/diagnosis-kit-groups/${kitGroupId}/kit-serial-numbers.xlsx`,
    undefined,
    { responseType: "blob", timeout: 50000 }
  );

  return data;
};

const makeProbiomeReportFormData = (pdfFile: File): FormData => {
  const formData = new FormData();
  formData.append("reportFile", pdfFile);
  return formData;
};

const uploadProbiomeReport = async (params: {
  diagnosisId: number;
  pdfFile: File;
}): Promise<ProbiomeReportUploadResponse> => {
  const { diagnosisId, pdfFile } = params;

  // 클라이언트 방어: pdf만 허용
  if (pdfFile && pdfFile.type && pdfFile.type !== "application/pdf") {
    throw new Error("PDF 파일만 업로드할 수 있습니다.");
  }

  const formData = makeProbiomeReportFormData(pdfFile);

  const { data } = await axiosInstance.put(
    `/api/v2/admin/probiome-diagnoses/${diagnosisId}/report`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "업로드에 실패했습니다.";
  throw new Error(message);
};

const updateProbiomeReport = async (params: {
  diagnosisId: number;
  pdfFile: File;
}): Promise<ProbiomeReportUploadResponse> => {
  const { diagnosisId, pdfFile } = params;

  // 클라이언트 방어: pdf만 허용
  if (pdfFile && pdfFile.type && pdfFile.type !== "application/pdf") {
    throw new Error("PDF 파일만 업로드할 수 있습니다.");
  }

  const formData = makeProbiomeReportFormData(pdfFile);

  const { data } = await axiosInstance.put(
    `/api/v2/admin/probiome-diagnoses/${diagnosisId}/report/replace`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "업로드에 실패했습니다.";
  throw new Error(message);
};

const downloadProbiomeReportByUrl = async (url: string): Promise<Blob> => {
  const res = await axiosInstance.get(url, {
    responseType: "blob",
    withCredentials: true,
  });
  return res.data;
};

export {
  getProbiomeList,
  getProbiomeDetail,
  updateProbiomeStatus,
  uploadProbiomeReport,
  getDiagnosisKitList,
  createDiagnosisKits,
  excelDownloadDiagnosisKits,
  downloadProbiomeReportByUrl,
  updateProbiomeReport,
};
