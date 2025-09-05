"use client";

import { useGetProbiomeDetail } from "@/api/diagnosis/queries/useGetProbiomeDetail";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import TimeLineInfo from "./timeLine/TimeLineInfo";
import PickupInfo from "./pickup/PickupInfo";
import BasicInfo from "./basic/BasicInfo";
import SurveyInfo from "./survery/SurveyInfo";
import StatusInfo from "./status/StatusInfo";
import { useUpdateProbiomeStatus } from "@/api/diagnosis/mutations/useUpdateProbiomeStatus";
import { useMutationToast } from "@/hooks/useMutaionToast";
import { PROBIOME_STATUS_CONFIG } from "@/constants/diagnosis";
import { useUploadProbiomeReport } from "@/api/diagnosis/mutations/useUploadProbiomeReport";
import { useCallback } from "react";
import { useDownloadProbiomeReport } from "@/api/diagnosis/mutations/useDownloadProbiomeReport";
import { downloadBlobFile } from "@/utils/downloadBlobFile";
import { useToastStore } from "@/store/useToastStore";

interface ProbiomeDetailProps {
  diagnosisId: number;
}

export default function ProbiomeDetail({ diagnosisId }: ProbiomeDetailProps) {
  const { data: probiomeDetail } = useGetProbiomeDetail(diagnosisId);
  const { addToast } = useToastStore();

  const { mutate: updateProbiomeStatus } = useUpdateProbiomeStatus(diagnosisId);
  const { mutate: uploadReport } = useUploadProbiomeReport(diagnosisId);
  const { mutate: downloadReport } = useDownloadProbiomeReport();

  const mutateToast = useMutationToast();

  const handleActions = () => {
    const currentStatus = probiomeDetail.diagnosisInfo.status;
    const nextStatus = PROBIOME_STATUS_CONFIG[currentStatus].nextStatus;
    mutateToast(
      updateProbiomeStatus,
      { diagnosisId, diagnosisStatus: nextStatus },
      "진단 상태가 변경되었습니다.",
      "진단 상태 변경에 실패했습니다."
    );
  };

  const handleUploadReport = useCallback(
    (file: File) => {
      mutateToast(
        uploadReport,
        file,
        "진단 상태가 변경되었습니다.",
        "진단 상태 변경에 실패했습니다."
      );
    },
    [mutateToast, uploadReport]
  );

  const handleReportDownload = (url: string, memberName: string) => {
    downloadReport(url, {
      onSuccess: (blob) => {
        downloadBlobFile(blob, `Report_${memberName}.pdf`);
        addToast("보고서 다운로드에 성공했습니다.");
      },
      onError: (err) => {
        console.error(err);
        addToast("보고서 다운로드에 실패했습니다.");
      },
    });
  };

  return (
    <ListLayout>
      <StatusInfo
        diagnosisData={probiomeDetail?.diagnosisInfo}
        memberName={probiomeDetail.basicInfo.memberInfo.name}
        onActions={handleActions}
        onUploadReport={handleUploadReport}
        onReportDownload={handleReportDownload}
      />
      {probiomeDetail?.analysisTimelineInfo && (
        <TimeLineInfo timLineData={probiomeDetail?.analysisTimelineInfo} />
      )}
      <PickupInfo pickupData={probiomeDetail?.pickupRequestInfo} />
      <BasicInfo basicData={probiomeDetail?.basicInfo} />
      <SurveyInfo surveyData={probiomeDetail?.surveyInfo} />
    </ListLayout>
  );
}
