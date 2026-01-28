import Card from "@/components/common/card/Card";
import DetailTable from "@/components/common/detailTable/DetailTable";
import {
  ACQUISITION_TYPES_LABEL,
  ALLERGEN_FOOD_LABEL,
  BODY_FIT_LABEL,
  DEFECATION_HABIT_LABEL,
  FEED_TIME_LABEL,
  FEED_TYPE_LABEL,
  FOOD_TYPE_LABEL,
  HEALTH_CONCERN_LABEL,
  INTAKE_STATUS_LABEL,
  LEVEL5_LABEL,
  PET_TYPES_LABEL,
  PREGNANCY_STATUS_LABEL,
  SUPPLEMENT_TYPE_LABEL,
  TREATING_DISEASE_LABEL,
} from "@/constants/diagnosis";
import { TableItem } from "@/types/common";
import { SurveyInfoType } from "@/types/diagnosis";

interface SurveyInfoProps {
  surveyData: SurveyInfoType;
}

export default function SurveyInfo({ surveyData }: SurveyInfoProps) {
  const infoList1: TableItem[] = [
    {
      label: "반려견 체형",
      value: BODY_FIT_LABEL[surveyData.bodyFit],
    },
    {
      label: "유산균 급여",
      value: INTAKE_STATUS_LABEL[surveyData.probioticsStatus],
    },
    {
      label: "유산균 제품명",
      value: surveyData.probioticsProduct ?? "-",
    },
    {
      label: "항생제 투여",
      value: INTAKE_STATUS_LABEL[surveyData.antibioticsStatus],
    },
    {
      label: "알러지",
      value: (
        <>
          {surveyData.allergenFoodList
            .map((item) => ALLERGEN_FOOD_LABEL[item])
            .join(", ")}
        </>
      ),
    },
    {
      label: "임신 여부",
      value: PREGNANCY_STATUS_LABEL[surveyData.pregnancyStatus],
    },
    {
      label: "활동량",
      value: LEVEL5_LABEL[surveyData.activityLevel],
    },
    {
      label: "치료중 질환",
      value: (
        <>
          {surveyData.treatingDiseaseList
            .map((item) => TREATING_DISEASE_LABEL[item])
            .join(", ")}
        </>
      ),
    },
  ];
  const infoList2: TableItem[] = [
    {
      label: "주 급여 사료",
      value: FOOD_TYPE_LABEL[surveyData.foodType],
    },
    {
      label: "급여 방식",
      value: FEED_TYPE_LABEL[surveyData.feedType],
    },
    {
      label: "급여중 사료명",
      value: surveyData.foodProduct ?? "-",
    },
    {
      label: "급여 시간",
      value: (
        <>
          {surveyData.feedTimeList
            .map((item) => FEED_TIME_LABEL[item])
            .join(", ")}
        </>
      ),
    },
    {
      label: "배변습관",
      value: DEFECATION_HABIT_LABEL[surveyData.defecationHabit],
    },
    {
      label: "간식량",
      value: LEVEL5_LABEL[surveyData.snackLevel],
    },
    {
      label: "동거 반려동물",
      value: (
        <>
          {surveyData.cohabitingPetList
            .map((item) => PET_TYPES_LABEL[item])
            .join(", ")}
        </>
      ),
    },
    {
      label: "영양제 급여",
      value: (
        <>
          {surveyData.supplementTypeList
            .map((item) => SUPPLEMENT_TYPE_LABEL[item])
            .join(", ")}
        </>
      ),
    },
    {
      label: "영양제 제품명",
      value: surveyData.supplementProduct,
    },
    {
      label: "고민사항",
      value: (
        <>
          {surveyData.healthConcernList
            .map((item) => HEALTH_CONCERN_LABEL[item])
            .join(", ")}
        </>
      ),
    },
    {
      label: "키트 수령 경로",
      value: ACQUISITION_TYPES_LABEL[surveyData.acquisitionType],
    },
    {
      label: "그 외 특이사항",
      value: surveyData.otherComment,
    },
  ];
  return (
    <Card padding={20} gap={12}>
      <DetailTable
        items={infoList1}
        columns={2}
        title="사전 문진 : 건강 상태"
      />
      <DetailTable
        items={infoList2}
        columns={2}
        title="사전 문진 : 생활 습관 및 기타"
      />
    </Card>
  );
}
