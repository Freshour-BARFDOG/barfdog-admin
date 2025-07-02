import { OrderInfoDto } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { format, parseISO } from "date-fns";

interface CancelInfoProps {
  orderInfoDto: OrderInfoDto;
  orderStatus: string;
}

export default function CancelInfo({
  orderInfoDto,
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
      value: orderInfoDto.cancelRequestDate
        ? format(parseISO(orderInfoDto.cancelRequestDate), "yyyy-MM-dd HH:mm")
        : "-",
    },
    {
      label: "취소승인일",
      value: orderInfoDto.cancelConfirmDate
        ? format(parseISO(orderInfoDto.cancelConfirmDate), "yyyy-MM-dd HH:mm")
        : "-",
    },
    {
      label: "취소요청사유",
      value: orderInfoDto.cancelReason,
      fullWidth: true,
    },
    {
      label: "취소상세사유",
      value: orderInfoDto.cancelDetailReason,
      fullWidth: true,
    },
  ];
  return <DetailTable items={infoList} columns={2} title="취소정보" />;
}
