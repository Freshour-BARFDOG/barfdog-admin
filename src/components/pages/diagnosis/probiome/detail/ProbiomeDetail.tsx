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

interface ProbiomeDetailProps {
  diagnosisId: number;
}

export default function ProbiomeDetail({ diagnosisId }: ProbiomeDetailProps) {
  const { data: probiomeDetail } = useGetProbiomeDetail(diagnosisId);
  console.log(probiomeDetail);

  const { mutate: updateProbiomeStatus } = useUpdateProbiomeStatus(diagnosisId);
  const mutateToast = useMutationToast();

  const handleActions = () => {
    const currentStatus = probiomeDetail.diagnosisInfo.status;
    const nextStatus = PROBIOME_STATUS_CONFIG[currentStatus].nextStatus;
    if (currentStatus === "ANALYSIS_IN_PROGRESS") {
      // TODO: 결과지 업로드 API 호출
      return;
    } else if (currentStatus === "REPORT_COMPLETED") {
      // TODO: 결과지 수정 API 호출
      return;
    } else if (
      currentStatus === "KIT_PICKUP_REQUESTED" ||
      currentStatus === "KIT_PICKUP_COMPLETED"
    ) {
      // 상태 업데이트 API 호출
      mutateToast(
        updateProbiomeStatus,
        { diagnosisId, diagnosisStatus: nextStatus },
        "진단 상태가 변경되었습니다.",
        "진단 상태 변경에 실패했습니다."
      );
    }
  };

  return (
    <ListLayout>
      <StatusInfo
        diagnosisData={probiomeDetail?.diagnosisInfo}
        onActions={handleActions}
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
