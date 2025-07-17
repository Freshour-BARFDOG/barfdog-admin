"use client";

import { useGetRecipeList } from "@/api/products/queries/useGetRecipeList";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import Text from "@/components/common/text/Text";
import { useToastStore } from "@/store/useToastStore";
import { commonWrapper } from "@/styles/common.css";
import { TableColumn } from "@/types/common";
import { GetRecipeListResponse, RecipeDto } from "@/types/products";
import { truncateText } from "@/utils/truncateText";
import Link from "next/link";

export default function RawProductList() {
  const { data } = useGetRecipeList();
  const { addToast } = useToastStore();
  const handleDelete = async (itemId: number) => {
    // mutate(itemId, {
    //   onSuccess: async () => {
    //     addToast("레시피 삭제가 완료되었습니다.");
    //   },
    //   onError: () => {
    //     addToast("레시피 삭제를 실패했습니다");
    //   },
    // });
  };

  const columns: TableColumn<RecipeDto>[] = [
    {
      key: "id",
      header: "번호",
      width: "60px",
      render: (row, index) => index + 1,
    },
    {
      key: "name",
      header: "레시피 이름",
    },
    {
      key: "description",
      header: "레시피 설명",
      render: (row) => truncateText(row.description, 10),
    },
    {
      key: "pricePerGram",
      header: "가격 상수",
    },
    { key: "gramPerKcal", header: "무게 상수" },
    { key: "ingredients", header: "재료" },
    {
      key: "leaked",
      header: "노출 여부",
      render: (row) => (row.leaked === "LEAKED" ? "Y" : "N"),
    },
    {
      key: "inStock",
      header: "판매 여부",
      render: (row) => (row.inStock ? "Y" : "N"),
    },
    {
      key: "modifiedDate",
      header: "수정일",
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
      <TableSection
        data={data as GetRecipeListResponse}
        columns={columns}
        title="레시피 목록"
        emptyText="레시피 데이터가 없습니다."
      />
    </div>
  );
}
