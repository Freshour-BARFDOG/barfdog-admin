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
import { useUpdateProbiomeReport } from "@/api/diagnosis/mutations/useUpdateProbiomeReport";

interface ProbiomeDetailProps {
  diagnosisId: number;
}

export default function ProbiomeDetail({ diagnosisId }: ProbiomeDetailProps) {
  const { data: probiomeDetail } = useGetProbiomeDetail(diagnosisId);
  const { addToast } = useToastStore();

  const { mutate: updateProbiomeStatus } = useUpdateProbiomeStatus(diagnosisId);
  const { mutate: uploadReport } = useUploadProbiomeReport(diagnosisId);
  const { mutate: updateReport } = useUpdateProbiomeReport(diagnosisId);
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
        "결과지가 업로드 되었습니다.",
        "결과지 업로드에 실패했습니다."
      );
    },
    [mutateToast, uploadReport]
  );

  const handleUpdateReport = useCallback(
    (file: File) => {
      mutateToast(
        updateReport,
        file,
        "결과지가 수정 되었습니다.",
        "결과지 수정에 실패했습니다."
      );
    },
    [mutateToast, uploadReport]
  );

  const handleReportDownload = (
    url: string,
    memberName: string,
    petName: string
  ) => {
    downloadReport(url, {
      onSuccess: (blob) => {
        downloadBlobFile(blob, `${memberName}_${petName}.pdf`);
        addToast("결과지 다운로드에 성공했습니다.");
      },
      onError: (err) => {
        console.error(err);
        addToast("결과지 다운로드에 실패했습니다.");
      },
    });
  };

  return (
    <ListLayout>
      <StatusInfo
        diagnosisData={probiomeDetail?.diagnosisInfo}
        memberName={probiomeDetail.basicInfo.memberInfo.name}
        petName={probiomeDetail.basicInfo.petInfo.name}
        onActions={handleActions}
        onUploadReport={handleUploadReport}
        onUpdateReport={handleUpdateReport}
        onReportDownload={handleReportDownload}
      />
      {probiomeDetail?.analysisTimelineInfo && (
        <TimeLineInfo timLineData={probiomeDetail?.analysisTimelineInfo} />
      )}
      {probiomeDetail.diagnosisInfo.status !== "SURVEY_SUBMITTED" && (
        <PickupInfo pickupData={probiomeDetail?.pickupRequestInfo} />
      )}
      <BasicInfo basicData={probiomeDetail?.basicInfo} />
      <SurveyInfo surveyData={probiomeDetail?.surveyInfo} />
    </ListLayout>
  );
}
