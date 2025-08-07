"use client";

import { useExcelDownloadSearchSales } from "@/api/sales/mutations/useExcelDownloadSearchSales";
import { useGetSearchSales } from "@/api/sales/queries/useGetSearchSales";
import Button from "@/components/common/button/Button";
import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import Loader from "@/components/common/loader/Loader";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import SelectBox from "@/components/common/selectBox/SelectBox";
import TableSection from "@/components/common/tableSection/TableSection";
import Text from "@/components/common/text/Text";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import { PAGE_SIZE } from "@/constants/common";
import {
  INITIAL_SEARCH_REQUEST,
  SALES_ORDER_TYPE,
  SALES_SEARCH_CATEGORY,
  ORDER_STATUS,
  ORDER_STATUS_LABEL_MAP,
} from "@/constants/sales";
import { useSearchCategoryKeyword } from "@/hooks/useSearchCategoryKeyword";
import useSearchValues from "@/hooks/useSearchValues";
import { useToastStore } from "@/store/useToastStore";
import { SearchFilterItem, TableColumn } from "@/types/common";
import {
  SalesBaseRow,
  OrderStatus,
  OrderTypeRequest,
  SearchSalesData,
  SearchSalesParams,
  SearchSalesRequest,
} from "@/types/sales";
import { downloadBlobFile } from "@/utils/downloadBlobFile";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { format } from "date-fns";
import Link from "next/link";

export default function SalesSearch() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    onChangePage,
    onSubmit,
    onReset,
  } = useSearchValues<SearchSalesRequest>(INITIAL_SEARCH_REQUEST);

  const rawBody = submittedValues ?? INITIAL_SEARCH_REQUEST;

  const body: SearchSalesRequest = {
    ...rawBody,
    statusList:
      rawBody.statusList === null
        ? null
        : Array.isArray(rawBody.statusList)
        ? rawBody.statusList
        : [rawBody.statusList], // 문자열이면 배열로 감싸기
  };

  const params: SearchSalesParams = {
    body,
    page,
    size: PAGE_SIZE.SALES.ORDERS,
  };

  const { data, isLoading } = useGetSearchSales(params);

  const { mutate: excelDownload } = useExcelDownloadSearchSales();
  const { addToast } = useToastStore();

  const isDisableDownload = submittedValues.orderType === "ALL";

  const today = format(new Date(), "yyyy-MM-dd");

  const handleExcelDownload = () => {
    excelDownload(submittedValues, {
      onSuccess: (data) => {
        downloadBlobFile(data as Blob, `판매 관리_${today}.xlsx`);
      },
      onError: (error) => {
        addToast("엑셀 다운로드에 실패했습니다.\n관리자에게 문의해주세요.");
        console.error(error);
      },
    });
  };

  const { keyword, selectedCategory, onChangeCategory, onChangeKeyword } =
    useSearchCategoryKeyword<
      SearchSalesRequest,
      "memberName" | "memberEmail" | "dogName" | "merchantUid" | "recipientName"
    >({
      searchValues,
      setSearchValues,
      initialCategoryOptions: [
        "memberName",
        "memberEmail",
        "dogName",
        "merchantUid",
        "recipientName",
      ],
    });

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
        <SelectBox<OrderStatus>
          options={ORDER_STATUS}
          value={(searchValues.statusList ?? "ALL") as OrderStatus}
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              statusList: value === "ALL" ? null : [value as OrderStatus],
            })
          }
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
      key: "detail",
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
        onSubmit={onSubmit}
        onReset={onReset}
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
          <Button
            variant="outline"
            type="assistive"
            size="sm"
            onClick={handleExcelDownload}
            disabled={isDisableDownload}
          >
            엑셀 다운로드
          </Button>
        }
      />
    </ListLayout>
  );
}
