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
  ProbiomeListItem,
  ProbiomeListParams,
  ProbiomeListRequest,
  ProbiomeListResponse,
  DiagnosisStatus,
} from "@/types/diagnosis";
import Chips from "@/components/common/chips/Chips";
import { useGetProbiomeList } from "@/api/diagnosis/queries/useGetProbiomeList";

export default function ProbiomeDiagnosis() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    onChangePage,
    onSubmit,
    onReset,
  } = useSearchValues<ProbiomeListRequest>(INITIAL_PROBIOME_REQUEST);
  const params: ProbiomeListParams = {
    body: submittedValues ?? INITIAL_PROBIOME_REQUEST,
    page,
    size: PAGE_SIZE.COMMON,
  };

  const { data } = useGetProbiomeList(params);
  // 조건검색 카테고리
  const { keyword, selectedCategory, onChangeCategory, onChangeKeyword } =
    useSearchCategoryKeyword<
      ProbiomeListRequest,
      "memberName" | "petName" | "kitSerialNumber"
    >({
      searchValues,
      setSearchValues,
      initialCategoryOptions: ["memberName", "petName", "kitSerialNumber"],
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
        <LabeledRadioButtonGroup<DiagnosisStatus | null>
          options={PROBIOME_STATUS}
          value={searchValues.diagnosisStatus}
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              diagnosisStatus: value as DiagnosisStatus | null,
            })
          }
          optionType="radio"
        />
      ),
    },
  ];

  const columns: TableColumn<ProbiomeListItem>[] = [
    {
      key: "id",
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
      key: "id",
      header: "상세보기",
      render: (row) => {
        const diagnosisId = row.diagnosisId;
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
            color={PROBIOME_STATUS_CONFIG[row.diagnosisStatus].chipColor}
          >
            {PROBIOME_STATUS_CONFIG[row.diagnosisStatus].label}
          </Chips>
        );
      },
    },
    { key: "memberName", header: "견주 이름" },
    {
      key: "petName",
      header: "반려견명",
      render: (row) => (row.petName ? row.petName : "-"),
    },
    { key: "phoneNumber", header: "연락처" },
    { key: "email", header: "이메일" },
    { key: "kitSerialNumber", header: "시리얼번호" },
    { key: "diagnosisDate", header: "문진 작성일" },
  ];

  return (
    <ListLayout>
      <SearchFilterGroup
        items={filters}
        onSubmit={handleFilterSubmit}
        onReset={handleFilterReset}
      />
      <TableSection
        data={data?.diagnosisList as ProbiomeListItem[]}
        columns={columns}
        page={page}
        onPageChange={onChangePage}
        totalPages={data?.pagination?.totalPages ?? 0}
        title="목록"
        emptyText="프로바이옴 진단 데이터가 없습니다."
      />
    </ListLayout>
  );
}
