"use client";

import { useDeleteGeneralProduct } from "@/api/products/mutations/useDeleteGeneralProduct";
import { useGetGeneralProductList } from "@/api/products/queries/useGetGeneralProductList";
import Button from "@/components/common/button/Button";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import SelectBox from "@/components/common/selectBox/SelectBox";
import TableSection from "@/components/common/tableSection/TableSection";
import Text from "@/components/common/text/Text";
import { PAGE_SIZE } from "@/constants/common";
import {
  GENERAL_PRODUCT_CATEGORY_OPTIONS,
  GENERAL_PRODUCT_CATEGORY_MAP,
  INITIAL_PRODUCTS_REQUEST,
} from "@/constants/products";

import useSearchValues from "@/hooks/useSearchValues";
import { useToastStore } from "@/store/useToastStore";
import { commonWrapper } from "@/styles/common.css";
import { SearchFilterItem, TableColumn } from "@/types/common";
import {
  GeneralProductBaseRow,
  GeneralProductItemList,
  GeneralProductSearchValues,
  GeneralProductType,
} from "@/types/products";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { format } from "date-fns";
import Link from "next/link";

export default function GeneralProductList() {
  const {
    searchValues,
    setSearchValues,
    submittedValues,
    page,
    setPage,
    onSubmit,
    onReset,
  } = useSearchValues<GeneralProductSearchValues>(INITIAL_PRODUCTS_REQUEST);

  const params = {
    ...submittedValues,
    page,
    size: PAGE_SIZE.COMMON,
  };

  const { data } = useGetGeneralProductList(params);
  const { mutate } = useDeleteGeneralProduct();
  console.log("data", data);

  const { addToast } = useToastStore();
  const handleDelete = async (itemId: number) => {
    mutate(itemId, {
      onSuccess: async () => {
        addToast("일반 상품 삭제가 완료되었습니다.");
      },
      onError: () => {
        addToast("일반 상품 삭제를 실패했습니다");
      },
    });
  };

  const filters: SearchFilterItem[] = [
    {
      label: "카테고리",
      children: (
        <SelectBox<GeneralProductType>
          options={GENERAL_PRODUCT_CATEGORY_OPTIONS}
          value={searchValues.itemType ?? "ALL"}
          onChange={(value) =>
            setSearchValues({
              ...searchValues,
              itemType: value,
            })
          }
        />
      ),
    },
  ];

  const columns: TableColumn<GeneralProductBaseRow>[] = [
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
      key: "category",
      header: "카테고리",
      render: (row) => {
        return GENERAL_PRODUCT_CATEGORY_MAP[row.itemType] ?? row.itemType;
      },
    },
    {
      key: "name",
      header: "상품명",
    },
    {
      key: "originalPrice",
      header: "원가",
      render: (row) => `${row.originalPrice.toLocaleString()}원`,
    },
    {
      key: "salePrice",
      header: "판매가",
      render: (row) => `${row.salePrice.toLocaleString()}원`,
    },
    {
      key: "remaining",
      header: "재고",
    },
    {
      key: "discount",
      header: "일반할인",
      render: (row) => (row.discount === "0원" ? "-" : row.allianceDiscount),
    },
    {
      key: "allianceDiscount",
      header: "제휴사할인",
      render: (row) => (row.allianceDiscount ? row.allianceDiscount : "-"),
    },
    {
      key: "status",
      header: "노출여부",
      render: (row) => (row.status === "LEAKED" ? "Y" : "N"),
    },
    {
      key: "createDate",
      header: "생성일",
      render: (row) => format(row.createdDate, "yyyy-MM-dd"),
    },
    {
      key: "edit",
      header: "수정",
      render: (row) => {
        const itemId = row.id;
        return (
          <Link href={`/products/general/${itemId}`}>
            <Text type="body3" color="red">
              수정
            </Text>
          </Link>
        );
      },
    },
    {
      key: "delete",
      header: "삭제",
      render: (row) => {
        const itemId = row.id;
        return (
          <Button size="sm" variant="text" onClick={() => handleDelete(itemId)}>
            삭제
          </Button>
        );
      },
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
        data={data?.items as GeneralProductItemList}
        columns={columns}
        page={page}
        onPageChange={setPage}
        totalPages={data?.page?.totalPages ?? 0}
        title="목록"
        emptyText="상품 관리 데이터가 없습니다."
      />
    </div>
  );
}
