import Card from "@/components/common/card/Card";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { PET_GENDER_LABEL } from "@/constants/diagnosis";
import { TableItem } from "@/types/common";
import { BasicInfoType } from "@/types/diagnosis";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

interface BasicInfoProps {
  basicData: BasicInfoType;
}

export default function BasicInfo({ basicData }: BasicInfoProps) {
  const infoList: TableItem[] = [
    {
      label: "시리얼 번호",
      value: basicData.kitSerialNo,
    },
    {
      label: "문진 작성일",
      value: basicData.surveySubmittedDate,
    },
    {
      label: "견주 이름",
      value: basicData.memberInfo.name,
    },
    {
      label: "연락처",
      value: formatPhoneNumber(basicData.memberInfo.phoneNumber),
    },
    {
      label: "이메일",
      value: basicData.memberInfo.email,
    },
    {
      label: "반려견명",
      value: basicData.petInfo.name,
    },
    {
      label: "반려견 견종",
      value: basicData.petInfo.breedName ?? "-",
    },
    {
      label: "반려견 생년월일",
      value: basicData.petInfo.birthday,
    },
    {
      label: "반려견 성별",
      value: PET_GENDER_LABEL[basicData.petInfo.gender],
      fullWidth: true,
    },
  ];
  return (
    <Card padding={20}>
      <DetailTable items={infoList} columns={2} title="기본 정보" />
    </Card>
  );
}
