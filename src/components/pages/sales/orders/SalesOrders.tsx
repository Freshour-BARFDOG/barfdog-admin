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
  ORDERS_ORDER_STATUS,
  INITIAL_ORDERS_REQUEST,
} from "@/constants/sales";
import { useOrderActions } from "@/hooks/useOrderActions";
import useSearchValues from "@/hooks/useSearchValues";
import { commonWrapper } from "@/styles/common.css";
import { SearchFilterItem, TableColumn } from "@/types/common";
import {
  SalesBaseRow,
  SalesSearchCategory,
  OrderStatus,
  OrderTypeRequest,
  SearchSalesData,
  SearchSalesParams,
  SearchSalesRequest,
} from "@/types/sales";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import Link from "next/link";
import { useMemo, useState } from "react";
import CancelOrderModal from "../modal/CancelOrderModal";
import OrderDetailModal from "../modal/OrderDetailModal";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import Loader from "@/components/common/loader/Loader";

export default function SalesOrders() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    onChangePage,
    onSubmit,
    onReset,
  } = useSearchValues<SearchSalesRequest>(INITIAL_ORDERS_REQUEST);

  const params: SearchSalesParams = {
    body: submittedValues ?? INITIAL_ORDERS_REQUEST,
    page,
    size: PAGE_SIZE.SALES.ORDERS,
  };

  // 통합 검색 API 훅
  const { data, isLoading } = useGetSearchSales(params);

  const orderData = data?.orders ?? [];

  // 주문유형 전체일때 액션 사용 불가능
  const isDisableAction = submittedValues.orderType === "ALL";

  // 조건검색 카테고리
  const [selectedCategory, setSelectedCategory] =
    useState<SalesSearchCategory>("memberName");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
    handleConfirm,
    handleDeny,
    handleDelivery,
    handleCancel,
    handleManage,

    // 주문 상세 모달
    handleDetail,
    isDetailModalOpen,
    onCloseDetailModal,
    detailData,
    // 판매 취소 모달
    isCancelModalOpen,
    cancelReason,
    setCancelReason,
    handleCancelConfirm,
    onCancelModalClose,
  } = useOrderActions(
    orderData,
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
    setSelectedIds(checked ? orderData.map((o) => o.id) : []);
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
            startDate: searchValues.from,
            endDate: searchValues.to,
          }}
          onChangeRange={(value) => {
            const { startDate, endDate } = value;
            setSearchValues({
              ...searchValues,
              from: startDate as string,
              to: endDate as string,
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
      label: "주문상태",
      children: (
        <LabeledRadioButtonGroup<OrderStatus>
          options={ORDERS_ORDER_STATUS}
          value={searchValues.statusList?.[0] ?? "PAYMENT_DONE"}
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
      // th에 들어갈 ReactNode
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
      // td에 들어갈 ReactNode
      render: (row) => (
        <LabeledCheckbox<number>
          value={row.id}
          isChecked={selectedIds.includes(row.id)}
          onToggle={(id) => handleSelectOne(id, !selectedIds.includes(row.id))}
          iconType="square"
          iconSize={18}
        />
      ),
    },
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
        const orderId = row.id;
        const orderType = row.orderType;
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
        totalPages={data?.page?.totalPages ?? 0}
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
              onClick={handleConfirm}
              disabled={isDisableAction}
            >
              주문확인
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDeny}
              disabled={isDisableAction}
            >
              확인취소
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDelivery}
              disabled={isDisableAction}
            >
              주문발송
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isDisableAction}
            >
              판매취소
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleManage}
              disabled={isDisableAction}
            >
              택배사 관리
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDetail}
              disabled={isDisableAction}
            >
              일반주문상세
            </Button>

            {/* 판매취소 모달 */}
            <CancelOrderModal
              isOpen={isCancelModalOpen}
              reason={cancelReason}
              selectedCount={selectedIds.length}
              onChangeReason={setCancelReason}
              onConfirm={handleCancelConfirm}
              onClose={onCancelModalClose}
            />
            <OrderDetailModal
              isOpen={isDetailModalOpen}
              detailData={detailData}
              onClose={onCloseDetailModal}
            />
          </div>
        }
      />
    </ListLayout>
  );
}
