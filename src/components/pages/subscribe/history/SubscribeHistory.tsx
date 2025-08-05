"use client";

import { useGetSubscribeHistory } from "@/api/subscribe/queries/useGetSubscribeHistory";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import TableSection from "@/components/common/tableSection/TableSection";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import { PAGE_SIZE } from "@/constants/common";
import {
  INITIAL_SUBSCRIBE_HISTORY_REQUEST,
  SUBSCRIBE_HISTORY_CATEGORY,
  SUBSCRIBE_STATUS,
} from "@/constants/subscribe";
import useSearchValues from "@/hooks/useSearchValues";
import { SearchFilterItem, TableColumn } from "@/types/common";
import {
  SubscribeHistoryDto,
  SubscribeHistoryList,
  SubscribeHistoryParams,
  SubscribeHistoryRequest,
} from "@/types/subscribe";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { format, parseISO } from "date-fns";
import { useState } from "react";

export default function SubscribeHistory() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    onChangePage,
    onSubmit,
    onReset,
  } = useSearchValues<SubscribeHistoryRequest>(
    INITIAL_SUBSCRIBE_HISTORY_REQUEST
  );

  const params: SubscribeHistoryParams = {
    body: submittedValues ?? INITIAL_SUBSCRIBE_HISTORY_REQUEST,
    page,
    size: PAGE_SIZE.COMMON,
  };

  const { data } = useGetSubscribeHistory(params);

  const [selectedCategory, setSelectedCategory] =
    useState<keyof SubscribeHistoryRequest>("memberName");

  const handleChangeCategory = (category: keyof SubscribeHistoryRequest) => {
    setSelectedCategory(category);
    onReset();
  };

  const filters: SearchFilterItem[] = [
    {
      label: "조건검색",
      children: (
        <SearchFilterKeyword
          categoryOptions={SUBSCRIBE_HISTORY_CATEGORY}
          selectedCategory={selectedCategory}
          keyword={searchValues[selectedCategory] ?? ""}
          onChangeCategory={(category) => handleChangeCategory(category)}
          onChangeKeyword={(keyword) => {
            setSearchValues({ ...searchValues, [selectedCategory]: keyword });
          }}
          onSubmit={onSubmit}
        />
      ),
    },
  ];

  const columns: TableColumn<SubscribeHistoryDto>[] = [
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
      key: "deleted",
      header: "삭제여부",
      render: (row) => (row.deleted ? "Y" : "N"),
    },
    { key: "subscribeId", header: "구독 ID" },
    {
      key: "memberName",
      header: "견주 이름",
    },
    { key: "email", header: "견주 ID" },
    { key: "dogName", header: "반려견명" },
    {
      key: "subscribeStatus",
      header: "구독 상태",
      render: (row) =>
        row.subscribeStatus ? SUBSCRIBE_STATUS[row.subscribeStatus] : "-",
    },
    {
      key: "createdDate",
      header: "최소 설문 일",
      render: (row) =>
        row.createdDate ? format(parseISO(row.createdDate), "yyyy-MM-dd") : "-",
    },
    {
      key: "modifiedDate",
      header: "구독 수정일",
      render: (row) =>
        row.modifiedDate
          ? format(parseISO(row.modifiedDate), "yyyy-MM-dd")
          : "-",
    },
    {
      key: "subscribePlan",
      header: "플랜",
    },
    {
      key: "recipeName",
      header: "레시피 이름",
    },
    {
      key: "oneMealGramsPerRecipe",
      header: "한끼 급여량",
      render: (row) => `${row.oneMealGramsPerRecipe}g`,
    },
    {
      key: "nextPaymentPrice",
      header: "다음 결제 원금",
      render: (row) => `${row.nextPaymentPrice.toLocaleString()}원`,
    },
    {
      key: "nextPaymentDate",
      header: "다음 결제일",
      render: (row) =>
        row.nextPaymentDate
          ? format(parseISO(row.nextPaymentDate), "yyyy-MM-dd")
          : "-",
    },
    {
      key: "countSkipOneTime",
      header: "건너뛰기 횟수",
    },
    {
      key: "countSkipOneWeek",
      header: "건너뛰기 횟수",
    },
    {
      key: "memberCouponName",
      header: "사용 쿠폰 이름",
      render: (row) => (row.memberCouponName ? row.memberCouponName : "-"),
    },
    {
      key: "discountCoupon",
      header: "쿠폰 할인 금액",
      render: (row) => `${row.discountCoupon.toLocaleString()}원`,
    },
    {
      key: "overDiscount",
      header: "초과 할인 금액",
      render: (row) => `${row.overDiscount.toLocaleString()}원`,
    },
    {
      key: "discountGrade",
      header: "등급 할인 금액",
      render: (row) => `${row.discountGrade.toLocaleString()}원`,
    },
    {
      key: "cancelDate",
      header: "구독 취소 신청일",
      render: (row) =>
        row.cancelDate ? format(parseISO(row.cancelDate), "yyyy-MM-dd") : "-",
    },
    {
      key: "cancelDoneDate",
      header: "구독 취소 예정일",
      render: (row) =>
        row.cancelDoneDate
          ? format(parseISO(row.cancelDoneDate), "yyyy-MM-dd")
          : "-",
    },
    {
      key: "cancelReason",
      header: "구독 취소 사유",
      render: (row) => row.cancelReason ?? "-",
    },
  ];

  return (
    <ListLayout>
      <SearchFilterGroup
        items={filters}
        onSubmit={onSubmit}
        onReset={onReset}
      />
      <TableSection
        data={data?.history as SubscribeHistoryList}
        columns={columns}
        page={page}
        onPageChange={onChangePage}
        totalPages={data?.page?.totalPages ?? 0}
        title="목록"
        emptyText="판매 관리 데이터가 없습니다."
      />
    </ListLayout>
  );
}
