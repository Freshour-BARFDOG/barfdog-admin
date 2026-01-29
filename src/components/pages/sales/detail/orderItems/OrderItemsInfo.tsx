import { OrderItemDetail } from "@/types/sales";
import React from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";

interface OrderItemsInfoProps {
  orderItemList: OrderItemDetail[];
  title: string;
}

export default function OrderItemsInfo({
  orderItemList,
  title,
}: OrderItemsInfoProps) {
  return (
    <>
      {orderItemList.map((item, idx) => {
        const { orderItemId, orderItemName, amount, salePrice, itemOptionList } =
          item;

        // 옵션이 여러 개라면 쉼표로 나열
        const optionText =
          itemOptionList
            ?.map(
              (opt) =>
                `${opt.optionName} (${opt.optionPrice.toLocaleString()}원) / ${
                  opt.optionAmount
                }개 / ${(opt.optionPrice * opt.optionAmount).toLocaleString()}원`
            )
            .join(", ") || "";

        // 테이블용 아이템 배열
        const infoList = [
          { label: "상품주문번호", value: orderItemId },
          { label: "상품명", value: orderItemName },
          { label: "옵션", value: optionText || "-", fullWidth: true },
          { label: "상품수량", value: `${amount}개` },
          { label: "판매금액", value: `${salePrice.toLocaleString()}원` },
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
