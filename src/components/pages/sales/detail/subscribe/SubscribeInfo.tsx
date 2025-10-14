import { SubscribeDto } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";

interface SubscribeInfoProps {
  subscribeDto: SubscribeDto;
}

export default function SubscribeInfo({ subscribeDto }: SubscribeInfoProps) {
  if (!subscribeDto) return null;
  const infoList = [
    {
      label: "구독회차",
      value: `${subscribeDto.subscribeCount}회차`,
      fullWidth: true,
    },
    {
      label: "플랜",
      value: subscribeDto.plan,
      fullWidth: true,
    },
    { label: "레시피", value: subscribeDto.recipeName },
    { label: "급여량", value: `${subscribeDto.oneMealGramsPerRecipe}g` },
  ];
  return <DetailTable items={infoList} columns={2} title="구독 정보" />;
}
