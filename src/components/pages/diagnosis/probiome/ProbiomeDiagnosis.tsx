"use client";

import DateRangeFilter from "@/components/common/dateRangeFilter/DateRangeFilter";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import TableSection from "@/components/common/tableSection/TableSection";
import Text from "@/components/common/text/Text";
import { PAGE_SIZE } from "@/constants/common";
import useSearchValues from "@/hooks/useSearchValues";
import { SearchFilterItem, TableColumn } from "@/types/common";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import Link from "next/link";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import { useSearchCategoryKeyword } from "@/hooks/useSearchCategoryKeyword";
import {
  INITIAL_PROBIOME_REQUEST,
  PROBIOME_CATEGORY,
  PROBIOME_STATUS,
  PROBIOME_STATUS_CONFIG,
} from "@/constants/diagnosis";
import {
  ProbiomeListResponse,
  ProbiomeParams,
  ProbiomeRequest,
  ProbiomeStatus,
} from "@/types/diagnosis";
import Chips from "@/components/common/chips/Chips";

export default function ProbiomeDiagnosis() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    onChangePage,
    onSubmit,
    onReset,
  } = useSearchValues<ProbiomeRequest>(INITIAL_PROBIOME_REQUEST);

  const params: ProbiomeParams = {
    body: submittedValues ?? INITIAL_PROBIOME_REQUEST,
    page,
    size: PAGE_SIZE.COMMON,
  };

  // const { data, isLoading } = useGetSearchSales(params);
  // 임시 mock 데이터
  const data = {
    probiomeDiagnosisList: [
      {
        id: 47,
        memberName: "김철수",
        phoneNumber: "010-1234-5678",
        email: "kim@example.com",
        status: "SUBMITTED" as ProbiomeStatus,
        dogName: "두부",
        serialNumber: "PB001234567",
        submitDate: "2025-08-18",
      },
      {
        id: 46,
        memberName: "이영희",
        phoneNumber: "010-9876-5432",
        email: "lee@example.com",
        status: "KIT_PICKUP_REQUESTED" as ProbiomeStatus,
        dogName: "초코",
        serialNumber: "PB001234566",
        submitDate: "2025-08-17",
      },
      {
        id: 45,
        memberName: "박민수",
        phoneNumber: "010-5555-1234",
        email: "park@example.com",
        status: "KIT_PICKUP_DONE" as ProbiomeStatus,
        dogName: "베리",
        serialNumber: "PB001234565",
        submitDate: "2025-08-16",
      },
      {
        id: 44,
        memberName: "최지연",
        phoneNumber: "010-7777-8888",
        email: "choi@example.com",
        status: "ANALYZING" as ProbiomeStatus,
        dogName: "몽이",
        serialNumber: "PB001234564",
        submitDate: "2025-08-15",
      },
      {
        id: 43,
        memberName: "정수한",
        phoneNumber: "010-3333-4444",
        email: "jung@example.com",
        status: "COMPLETED" as ProbiomeStatus,
        dogName: "콩이",
        serialNumber: "PB001234563",
        submitDate: "2025-08-14",
      },
    ],
    page: {
      size: 10,
      totalElements: 5,
      totalPages: 1,
      number: 0,
    },
  };

  // 조건검색 카테고리
  const { keyword, selectedCategory, onChangeCategory, onChangeKeyword } =
    useSearchCategoryKeyword<
      ProbiomeRequest,
      "memberName" | "dogName" | "serialNumber"
    >({
      searchValues,
      setSearchValues,
      initialCategoryOptions: ["memberName", "dogName", "serialNumber"],
    });

  const handleFilterSubmit = () => {
    onSubmit(); // 원래 onSubmit 호출
  };

  const handleFilterReset = () => {
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
          categoryOptions={PROBIOME_CATEGORY}
          selectedCategory={selectedCategory}
          keyword={keyword}
          onChangeCategory={onChangeCategory}
          onChangeKeyword={onChangeKeyword}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      label: "주문유형",
      children: (
        <LabeledRadioButtonGroup<ProbiomeStatus>
          options={PROBIOME_STATUS}
          value={searchValues.status}
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              status: value as ProbiomeStatus,
            })
          }
          optionType="radio"
        />
      ),
    },
  ];

  const columns: TableColumn<ProbiomeListResponse>[] = [
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
        const diagnosisId = row.id;
        return (
          <Link href={`/diagnosis/probiome/${diagnosisId}`} target="_blank">
            <Text type="body3" color="red">
              상세보기
            </Text>
          </Link>
        );
      },
    },
    {
      key: "status",
      header: "상태",
      render: (row) => {
        return (
          <Chips
            variant="solid"
            color={PROBIOME_STATUS_CONFIG[row.status].chipColor}
          >
            {PROBIOME_STATUS_CONFIG[row.status].label}
          </Chips>
        );
      },
    },
    { key: "memberName", header: "견주 이름" },
    {
      key: "dogName",
      header: "반려견명",
      render: (row) => (row.dogName ? row.dogName : "-"),
    },
    { key: "phoneNumber", header: "연락처" },
    { key: "email", header: "이메일" },
    { key: "serialNumber", header: "시리얼번호" },
    { key: "submitDate", header: "문진 작성일" },
  ];

  return (
    <ListLayout>
      <SearchFilterGroup
        items={filters}
        onSubmit={handleFilterSubmit}
        onReset={handleFilterReset}
      />
      <TableSection
        data={data?.probiomeDiagnosisList as ProbiomeListResponse[]}
        columns={columns}
        page={page}
        onPageChange={onChangePage}
        totalPages={data?.page?.totalPages ?? 0}
        title="목록"
        emptyText="프로바이옴 진단 데이터가 없습니다."
      />
    </ListLayout>
  );
}
