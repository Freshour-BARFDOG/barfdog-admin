"use client";

import { useExcelDownloadDogs } from "@/api/dogs/mutations/useExcelDownloadDogs";
import { useGetDogList } from "@/api/dogs/queries/useGetDogList";
import Button from "@/components/common/button/Button";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import TableSection from "@/components/common/tableSection/TableSection";
import Text from "@/components/common/text/Text";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import Loader from "@/components/common/loader/Loader";
import { PAGE_SIZE } from "@/constants/common";
import {
  DOGS_CATEGORY,
  DOGS_DELETED_STATUS,
  DOGS_SUBSCRIBE_STATUS,
  INITIAL_DOGS_REQUEST,
} from "@/constants/dog";
import useSearchValues from "@/hooks/useSearchValues";
import { useToastStore } from "@/store/useToastStore";
import { SearchFilterItem, TableColumn } from "@/types/common";
import {
  DogDto,
  DogListParams,
  DogListRequest,
  DogsCategory,
  DogsSubscribeStatus,
} from "@/types/dog";

import { downloadBlobFile } from "@/utils/downloadBlobFile";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { format, formatDate, parseISO } from "date-fns";
import Link from "next/link";
import { useState } from "react";

export default function DogList() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    onChangePage,
    onSubmit,
    onReset,
  } = useSearchValues<DogListRequest>(INITIAL_DOGS_REQUEST);

  const params: DogListParams = {
    body: submittedValues ?? INITIAL_DOGS_REQUEST,
    page,
    size: PAGE_SIZE.SALES.ORDERS,
  };

  const { data, isLoading } = useGetDogList(params);

  const { mutate: excelDownload } = useExcelDownloadDogs();
  const { addToast } = useToastStore();

  const today = format(new Date(), "yyyy-MM-dd");

  const handleExcelDownload = () => {
    excelDownload(submittedValues, {
      onSuccess: (data) => {
        downloadBlobFile(data as Blob, `반려견_리스트_${today}.xlsx`);
      },
      onError: (error) => {
        addToast("엑셀 다운로드에 실패했습니다");
        console.log(error);
      },
    });
  };

  const [selectedCategory, setSelectedCategory] =
    useState<keyof DogsCategory>("dogName");

  const filters: SearchFilterItem[] = [
    {
      label: "조건검색",
      children: (
        <SearchFilterKeyword
          categoryOptions={DOGS_CATEGORY}
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
      label: "구독 여부",
      children: (
        <LabeledRadioButtonGroup<DogsSubscribeStatus>
          options={DOGS_SUBSCRIBE_STATUS}
          value={searchValues.subscribeStatus ?? "ALL"}
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              subscribeStatus: value as DogsSubscribeStatus,
            })
          }
          optionType="radio"
        />
      ),
    },
    {
      label: "삭제 여부",
      children: (
        <LabeledRadioButtonGroup<string>
          options={DOGS_DELETED_STATUS}
          value={searchValues.isDeleted ?? ""}
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              isDeleted: value as string,
            })
          }
          optionType="radio"
        />
      ),
    },
  ];

  const columns: TableColumn<DogDto>[] = [
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
        const dogId = row.dogId;
        return (
          <Link href={`/dogs/${dogId}`} target="_blank">
            <Text type="body3" color="red">
              상세보기
            </Text>
          </Link>
        );
      },
    },
    {
      key: "isDeleted",
      header: "삭제",
      render: (row) => {
        return row.deleted ? "Y" : "N";
      },
    },
    {
      key: "memberName",
      header: "견주 이름",
    },
    { key: "email", header: "견주 ID" },
    {
      key: "subscribeStatus",
      header: "구독",
      render: (row) => {
        return row.subscribeStatus === "SUBSCRIBING" ? "Y" : "N";
      },
    },
    { key: "dogName", header: "반려견 명" },
    { key: "dogType", header: "품종" },
    {
      key: "dogGender",
      header: "성별",
      render: (row) => (row.dogGender === "MALE" ? "수컷" : "암컷"),
    },

    {
      key: "dogBirth",
      header: "생년월일",
      render: (row) => formatDate(parseISO(row.dogBirth), "yyyy-MM-dd"),
    },
    {
      key: "dogSize",
      header: "반려견 크기",
    },
    {
      key: "weight",
      header: "무게",
      render: (row) => (row.weight ? `${row.weight}kg` : "-"),
    },
    {
      key: "dogStatus",
      header: "상태",
      render: (row) => (row.dogStatus ? row.dogStatus : "-"),
    },
    {
      key: "neutralization",
      header: "중성화",
      render: (row) => (row.neutralization ? "Y" : "N"),
    },
    {
      key: "representative",
      header: "대표견",
      render: (row) => (row.representative ? "Y" : "N"),
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
        data={data?.dogs as DogDto[]}
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
          >
            엑셀 다운로드
          </Button>
        }
      />
    </ListLayout>
  );
}
