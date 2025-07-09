import { DogDto, SubscribeDto } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";

interface DogInfoProps {
  dogDto: DogDto;
}

export default function DogInfo({ dogDto }: DogInfoProps) {
  const infoList = [
    {
      label: "반려견명",
      value: dogDto.name,
      fullWidth: true,
    },
    {
      label: "못먹는 음식",
      value: dogDto.inedibleFood === "NONE" ? "N" : dogDto.inedibleFood,
    },
    {
      label: "특이사항",
      value: dogDto.caution === "NONE" ? "N" : dogDto.caution,
    },
  ];
  return <DetailTable items={infoList} columns={2} title="반려견 정보" />;
}
