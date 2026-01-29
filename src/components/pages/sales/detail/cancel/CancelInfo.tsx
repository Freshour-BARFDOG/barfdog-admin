import { OrderDetailInfo } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { format, parseISO } from "date-fns";

interface CancelInfoProps {
  orderInfo: OrderDetailInfo;
  orderStatus: string;
}

export default function CancelInfo({
  orderInfo,
  orderStatus,
}: CancelInfoProps) {
  const infoList = [
    {
      label: "처리상태",
      value: orderStatus,
      fullWidth: true,
    },
    {
      label: "취소요청일",
      value: orderInfo.cancelRequestDate
        ? format(parseISO(orderInfo.cancelRequestDate), "yyyy-MM-dd HH:mm")
        : "-",
    },
    {
      label: "취소승인일",
      value: orderInfo.cancelConfirmDate
        ? format(parseISO(orderInfo.cancelConfirmDate), "yyyy-MM-dd HH:mm")
        : "-",
    },
    {
      label: "취소요청사유",
      value: orderInfo.cancelReason,
      fullWidth: true,
    },
    {
      label: "취소상세사유",
      value: orderInfo.cancelDetailReason,
      fullWidth: true,
    },
  ];
  return <DetailTable items={infoList} columns={2} title="취소정보" />;
}
