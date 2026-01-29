"use client";

import { useGetSearchSales } from "@/api/sales/queries/useGetSearchSales";
import Button from "@/components/common/button/Button";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import TableSection from "@/components/common/tableSection/TableSection";
import Text from "@/components/common/text/Text";
import { PAGE_SIZE } from "@/constants/common";
import {
  SALES_ORDER_TYPE,
  SALES_SEARCH_CATEGORY,
  ORDER_STATUS_LABEL_MAP,
  ORDERS_CANCEL_STATUS,
  INITIAL_CANCEL_REQUEST,
} from "@/constants/sales";
import useSearchValues from "@/hooks/useSearchValues";
import { commonWrapper } from "@/styles/common.css";
import { SearchFilterItem, TableColumn } from "@/types/common";
import {
  SalesBaseRow,
  OrderStatus,
  OrderTypeRequest,
  SearchSalesData,
  SearchSalesParams,
  SearchSalesRequest,
} from "@/types/sales";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import Link from "next/link";
import { useMemo, useState } from "react";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import Loader from "@/components/common/loader/Loader";
import { useSearchCategoryKeyword } from "@/hooks/useSearchCategoryKeyword";
import { useCancelRequestActions } from "@/hooks/useCancelRequestActions";

export default function SalesCancel() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    onChangePage,
    onSubmit,
    onReset,
  } = useSearchValues<SearchSalesRequest>(INITIAL_CANCEL_REQUEST);

  const params: SearchSalesParams = {
    body: submittedValues ?? INITIAL_CANCEL_REQUEST,
    page,
    size: PAGE_SIZE.COMMON,
  };

  // 통합 검색 API 훅
  const { data, isLoading } = useGetSearchSales(params);

  const orderData = data?.orders ?? [];

  // 주문유형 전체일때 액션 사용 불가능
  const isDisableAction = submittedValues.orderType === "ALL";

  // 조건검색 카테고리
  const { keyword, selectedCategory, onChangeCategory, onChangeKeyword } =
    useSearchCategoryKeyword<
      SearchSalesRequest,
      "memberName" | "memberEmail" | "merchantUid"
    >({
      searchValues,
      setSearchValues,
      initialCategoryOptions: ["memberName", "memberEmail", "merchantUid"],
    });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { handleConfirmRequest, handleRejectRequest } = useCancelRequestActions(
    selectedIds,
    setSelectedIds,
    searchValues.orderType as OrderTypeRequest
  );

  // → 2) 전체선택 체크박스 상태 계산
  const allSelected = useMemo(
    () => orderData.length > 0 && selectedIds.length === orderData.length,
    [orderData.length, selectedIds]
  );

  // → 3) 전체선택 토글
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? orderData.map((o) => o.orderId) : []);
  };

  // → 4) 개별 선택 토글
  const handleSelectOne = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleFilterSubmit = () => {
    setSelectedIds([]); // 선택 초기화
    onSubmit(); // 원래 onSubmit 호출
  };

  const handleFilterReset = () => {
    setSelectedIds([]); // 선택 초기화
    onReset(); // 원래 onReset 호출
  };

  const filters: SearchFilterItem[] = [
    {
      label: "조회기간",
      children: (
        <DateRangeFilter
          value={{
            startDate: searchValues.fromDate,
            endDate: searchValues.toDate,
          }}
          onChangeRange={(value) => {
            const { startDate, endDate } = value;
            setSearchValues({
              ...searchValues,
              fromDate: startDate as string,
              toDate: endDate as string,
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
          categoryOptions={SALES_SEARCH_CATEGORY}
          selectedCategory={selectedCategory}
          keyword={keyword}
          onChangeCategory={onChangeCategory}
          onChangeKeyword={onChangeKeyword}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      label: "주문상태",
      children: (
        <LabeledRadioButtonGroup<OrderStatus>
          options={ORDERS_CANCEL_STATUS}
          value={
            (searchValues.statusList?.[0] ?? "CANCEL_REQUEST") as OrderStatus
          }
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              statusList: [value as OrderStatus],
            })
          }
          optionType="radio"
        />
      ),
    },
    {
      label: "주문유형",
      children: (
        <LabeledRadioButtonGroup<OrderTypeRequest>
          options={SALES_ORDER_TYPE}
          value={searchValues.orderType}
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              orderType: value as OrderTypeRequest,
            })
          }
          optionType="radio"
        />
      ),
    },
  ];

  const columns: TableColumn<SalesBaseRow>[] = [
    {
      key: "select",
      header: (
        <LabeledCheckbox<string>
          value="all"
          isChecked={allSelected}
          onToggle={() => handleSelectAll(!allSelected)}
          iconType="square"
          iconSize={18}
        />
      ),
      width: "40px",
      render: (row) => (
        <LabeledCheckbox<number>
          value={row.orderId}
          isChecked={selectedIds.includes(row.orderId)}
          onToggle={(id) =>
            handleSelectOne(id, !selectedIds.includes(row.orderId))
          }
          iconType="square"
          iconSize={18}
        />
      ),
    },
    {
      key: "orderId",
      header: "번호",
      width: "60px",
      render: (row, index) =>
        getTableRowNumber({
          totalElements: data?.pagination.totalCount as number,
          currentPage: data?.pagination.page as number,
          pageSize: data?.pagination.size as number,
          index,
        }).toString(),
    },
    {
      key: "orderId",
      header: "상세보기",
      render: (row) => {
        const orderId = row.orderId;
        const orderType = row.orderType.toLowerCase();
        return (
          <Link href={`/sales/${orderType}/${orderId}`} target="_blank">
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
      key: "isPackage",
      header: "묶음배송 여부",
      render: (row) => (row.isPackage ? "Y" : "N"),
    },
  ];

  if (isLoading) {
    return <Loader fullscreen />;
  }

  return (
    <ListLayout>
      <SearchFilterGroup
        items={filters}
        onSubmit={handleFilterSubmit}
        onReset={handleFilterReset}
      />
      <TableSection
        data={data?.orders as SearchSalesData[]}
        columns={columns}
        page={page}
        onPageChange={onChangePage}
        totalPages={data?.pagination?.totalPages ?? 0}
        title="목록"
        emptyText="판매 관리 데이터가 없습니다."
        action={
          <div
            className={commonWrapper({
              gap: 8,
              wrap: "wrap",
              justify: "start",
            })}
          >
            <Button
              size="sm"
              variant="outline"
              onClick={handleConfirmRequest}
              disabled={isDisableAction}
            >
              취소 승인
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRejectRequest}
              disabled={isDisableAction}
            >
              취소 반려
            </Button>
          </div>
        }
      />
    </ListLayout>
  );
}
