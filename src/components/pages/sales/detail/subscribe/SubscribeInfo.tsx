import { SubscribeDto } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";

interface SubscribeInfoProps {
  SubscribeDto: SubscribeDto;
}

export default function SubscribeInfo({ SubscribeDto }: SubscribeInfoProps) {
  const infoList = [
    {
      label: "구독회차",
      value: `${SubscribeDto.subscribeCount}회차`,
      fullWidth: true,
    },
    {
      label: "플랜",
      value: SubscribeDto.plan,
      fullWidth: true,
    },
    { label: "레시피", value: SubscribeDto.recipeName },
    { label: "급여량", value: `${SubscribeDto.oneMealGramsPerRecipe}g` },
  ];
  return <DetailTable items={infoList} columns={2} title="구독 정보" />;
}
