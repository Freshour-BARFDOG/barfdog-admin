"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useGetDiagnosisKitList } from "@/api/diagnosis/queries/useGetDiagnosisKitList";
import { PAGE_SIZE } from "@/constants/common";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { TableColumn } from "@/types/common";
import { DiagnosisKitGroup } from "@/types/diagnosis";
import ListLayout from "@/components/layout/listLayout/ListLayout";
import TableSection from "@/components/common/tableSection/TableSection";
import Button from "@/components/common/button/Button";
import {
  DIAGNOSIS_KIT_GROUP_STATUS_LABEL,
  DIAGNOSIS_KIT_TYPE_LABEL,
} from "@/constants/diagnosis";
import { useCreateDiagnosisKits } from "@/api/diagnosis/mutations/useCreateDiagnosisKits";
import useModal from "@/hooks/useModal";
import CreateKitModal from "../modal/CreateKitModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  defaultDiagnosisKitFormValues,
  diagnosisKitFormSchema,
  DiagnosisKitFormValues,
} from "@/utils/validation/diagnosis/diagnosis";
import { useMutationToast } from "@/hooks/useMutaionToast";
import { useExcelDownloadDiagnosisKits } from "@/api/diagnosis/mutations/useExcelDownloadKitGroup";
import { downloadBlobFile } from "@/utils/downloadBlobFile";
import { useToastStore } from "@/store/useToastStore";

export default function DiagnosisKitList() {
  const [page, setPage] = useState(0);
  const { isOpen, onClose, onToggle } = useModal();
  const { addToast } = useToastStore();
  const { data } = useGetDiagnosisKitList({ page, size: PAGE_SIZE.COMMON });
  const { mutate: createKitGroup } = useCreateDiagnosisKits();
  const { mutate: excelDownload } = useExcelDownloadDiagnosisKits();

  const mutateToast = useMutationToast();
  const form = useForm<DiagnosisKitFormValues>({
    resolver: yupResolver(diagnosisKitFormSchema),
    defaultValues: defaultDiagnosisKitFormValues,
    mode: "all",
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleKitModal = () => {
    onToggle();
  };

  const handleCreateKit = () => {
    const formData = form.getValues();
    const requestBody = {
      ...formData,
      manufactureDate: format(new Date(), "yyyy-MM-dd"),
    };
    onClose();
    mutateToast(
      createKitGroup,
      { body: requestBody },
      "진단 키트가 성공적으로 생성되었습니다.",
      "진단 키트 생성에 실패했습니다."
    );
  };

  const handleExcelDownload = (
    kitGroupId: number,
    kitType: string,
    generatedDate: string
  ) => {
    excelDownload(kitGroupId, {
      onSuccess: (data) => {
        downloadBlobFile(data as Blob, `${kitType}-${generatedDate}`);
        addToast("엑셀 다운로드에 성공했습니다.");
      },
      onError: (error) => {
        addToast("엑셀 다운로드에 실패했습니다.");
        console.error(error);
      },
    });
  };

  const columns: TableColumn<DiagnosisKitGroup>[] = [
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

    { key: "snGeneratedDate", header: "생성일" },
    {
      key: "kitType",
      header: "키트타입",
      render: (row) => DIAGNOSIS_KIT_TYPE_LABEL[row.kitType],
    },
    { key: "kitGroupName", header: "키트명" },
    { key: "manufacturer", header: "제조사" },
    { key: "kitCount", header: "생성 개수" },
    {
      key: "excelDownload",
      header: "다운로드",
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleExcelDownload(
              row.kitGroupId,
              DIAGNOSIS_KIT_TYPE_LABEL[row.kitType],
              row.snGeneratedDate
            )
          }
          disabled={row.kitGroupStatus === "SERIAL_NUM_ISSUED"}
        >
          엑셀 다운로드
        </Button>
      ),
    },
    {
      key: "kitGroupStatus",
      header: "상태",
      render: (row) => DIAGNOSIS_KIT_GROUP_STATUS_LABEL[row.kitGroupStatus],
    },
  ];

  return (
    <ListLayout>
      <TableSection
        data={data?.diagnosisKitGroupList as DiagnosisKitGroup[]}
        columns={columns}
        page={page}
        onPageChange={onChangePage}
        totalPages={data?.pagination?.totalPages ?? 0}
        title="목록"
        emptyText="진단 키트 데이터가 없습니다."
        action={
          <Button onClick={handleKitModal} size="sm">
            진단 키트 번호 생성
          </Button>
        }
      />
      <CreateKitModal
        isOpen={isOpen}
        onClose={onClose}
        onCreateKit={handleCreateKit}
        form={form}
      />
    </ListLayout>
  );
}
