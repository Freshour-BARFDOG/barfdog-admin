import { SubscribeDetailInfo } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";

interface SubscribeInfoProps {
  subscribeInfo: SubscribeDetailInfo;
}

export default function SubscribeInfo({ subscribeInfo }: SubscribeInfoProps) {
  if (!subscribeInfo) return null;

  const recipeText =
    subscribeInfo.recipeInfoList
      ?.map((r) => `${r.name} (${r.pricePerGram.toLocaleString()}원/g)`)
      .join(", ") || "-";

  const infoList = [
    { label: "반려견명", value: subscribeInfo.petName, fullWidth: true },
    {
      label: "구독회차",
      value: `${subscribeInfo.subscribeCount}회차`,
    },
    {
      label: "플랜",
      value: subscribeInfo.plan,
    },
    { label: "레시피", value: recipeText, fullWidth: true },
  ];
  return <DetailTable items={infoList} columns={2} title="구독 정보" />;
}
