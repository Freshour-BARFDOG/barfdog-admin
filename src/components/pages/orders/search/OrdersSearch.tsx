"use client";

import { useSearchOrders } from "@/api/orders/mutations/useSearchOrders";
import Button from "@/components/common/button/Button";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import SelectBox from "@/components/common/selectBox/SelectBox";
import TableSection from "@/components/common/tableSection/TableSection";
import Text from "@/components/common/text/Text";
import { PAGE_SIZE } from "@/constants/\bcommon";
import {
  INITIAL_ORDERS_REQUEST,
  ORDER_SEARCH_CATEGORY,
  ORDER_SEARCH_STATUS,
  ORDER_STATUS_LABEL_MAP,
} from "@/constants/orders";
import useSearchValues from "@/hooks/useSearchValues";
import { commonWrapper } from "@/styles/common.css";
import { SearchFilterItem, TableColumn } from "@/types/common";
import {
  BaseOrderRow,
  OrderSearchCategory,
  OrderStatus,
  SearchOrdersData,
  SearchOrdersParams,
  SearchOrdersRequest,
} from "@/types/orders";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { format } from "date-fns";
import { Link } from "lucide-react";
import { useCallback, useState } from "react";

export default function OrdersSearch() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    setPage,
    onSubmit,
    onReset,
  } = useSearchValues<SearchOrdersRequest>(INITIAL_ORDERS_REQUEST);

  const params: SearchOrdersParams = {
    body: submittedValues ?? INITIAL_ORDERS_REQUEST,
    page,
    size: PAGE_SIZE.ORDERS,
  };

  const { data } = useSearchOrders(params);

  const [selectedCategory, setSelectedCategory] =
    useState<OrderSearchCategory>("memberName");

  const filters: SearchFilterItem[] = [
    {
      label: "조회기간",
      children: (
        <DateRangeFilter
          onChangeRange={(value) => {
            const { startDate, endDate } = value;
            setSearchValues({
              ...searchValues,
              from: format(startDate as Date, "yyyy-MM-dd"),
              to: format(endDate as Date, "yyyy-MM-dd"),
            });
          }}
        />
      ),
      align: "start",
    },
    {
      label: "조건검색",
      children: (
        <SearchFilterKeyword
          categoryOptions={ORDER_SEARCH_CATEGORY}
          selectedCategory={selectedCategory}
          keyword={searchValues[selectedCategory] ?? ""}
          onChangeCategory={(category) => setSelectedCategory(category)}
          onChangeKeyword={(keyword) => {
            setSearchValues({ ...searchValues, [selectedCategory]: keyword });
          }}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      label: "주문유형",
      children: (
        <SelectBox<OrderStatus>
          options={ORDER_SEARCH_STATUS}
          value={searchValues.statusList?.[0] ?? "ALL"}
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              statusList: value === "ALL" ? null : [value as OrderStatus],
            })
          }
        />
      ),
    },
  ];

  const columns: TableColumn<BaseOrderRow>[] = [
    {
      key: "id",
      header: "번호",
      width: "60px",
      render: (row, index) =>
        getTableRowNumber({
          totalElements: data?.page.totalElements as number,
          currentPage: data?.page.number as number,
          pageSize: data?.page.size as number,
          index,
        }).toString(),
    },
    {
      key: "id",
      header: "상세보기",
      render: (row) => {
        const memberId = row.id;
        return (
          <Link href={`/member/${memberId}`} target="_blank">
            <Text type="body3" color="red">
              상세보기
            </Text>
          </Link>
        );
      },
    },
    { key: "merchantUid", header: "주문번호" },
    {
      key: "orderStatus",
      header: "주문상태",
      render: (row) => {
        // row.orderStatus 는 OrderStatus 타입
        return ORDER_STATUS_LABEL_MAP[row.orderStatus] ?? row.orderStatus;
      },
    },
    { key: "memberEmail", header: "구매자 ID" },
    { key: "memberName", header: "구매자" },
    {
      key: "recipientName",
      header: "수령자",
    },
    {
      key: "dogName",
      header: "반려견명",
      render: (row) => (row.dogName ? row.dogName : "-"),
    },
    {
      key: "packageDelivery",
      header: "묶음배송 여부",
      render: (row) => (row.packageDelivery ? "Y" : "N"),
    },
  ];

  return (
    <div className={commonWrapper({ direction: "col", gap: 20 })}>
      <SearchFilterGroup
        items={filters}
        onSubmit={onSubmit}
        onReset={onReset}
      />
      <TableSection
        data={data?.orders as SearchOrdersData[]}
        columns={columns}
        page={page}
        onPageChange={setPage}
        totalPages={data?.page?.totalPages ?? 0}
        title="목록"
        emptyText="판매 관리 데이터가 없습니다."
        action={
          <Button variant="outline" type="assistive" size="sm">
            엑셀 다운로드
          </Button>
        }
      />
    </div>
  );
}
