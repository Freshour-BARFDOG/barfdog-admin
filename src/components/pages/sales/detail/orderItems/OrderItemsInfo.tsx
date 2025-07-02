import { OrderItemAndOptionDto } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { ORDER_STATUS_LABEL_MAP } from "@/constants/sales";

interface OrderItemsInfoProps {
  orderItemAndOptionDtoList: OrderItemAndOptionDto[];
  title: string;
}

export default function OrderItemsInfo({
  orderItemAndOptionDtoList,
  title,
}: OrderItemsInfoProps) {
  return (
    <>
      {orderItemAndOptionDtoList.map((itemAndOption, idx) => {
        const { orderItemDto, selectOptionDtoList } = itemAndOption;
        const {
          orderItemId,
          itemName,
          amount,
          salePrice,
          finalPrice,
          couponName,
          discountAmount,
          status,
        } = orderItemDto;

        // 옵션이 여러 개라면 쉼표로 나열
        const optionText = selectOptionDtoList
          .map(
            (opt) =>
              `${opt.optionName} (${opt.price.toLocaleString()}원) / ${
                opt.amount
              }개 / ${(opt.price * opt.amount).toLocaleString()}원`
          )
          .join(", ");

        // 테이블용 아이템 배열
        const infoList = [
          { label: "상품주문번호", value: orderItemId },
          { label: "상품명", value: itemName },
          { label: "옵션", value: optionText || "-", fullWidth: true },
          { label: "쿠폰사용", value: couponName ?? "-" },
          {
            label: "쿠폰할인금액",
            value: `${discountAmount.toLocaleString()}원`,
          },
          { label: "상품수량", value: `${amount}개` },
          { label: "판매금액", value: `${salePrice.toLocaleString()}원` },
          { label: "처리상태", value: ORDER_STATUS_LABEL_MAP[status] },
          { label: "주문금액", value: `${finalPrice.toLocaleString()}원` },
        ];

        return (
          <DetailTable
            key={orderItemId}
            items={infoList}
            columns={2}
            title={`${title} ${idx + 1}`}
          />
        );
      })}
    </>
  );
}
