import { ReactNode } from "react";
import { TableColumn } from "@/types/common";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import Table from "@/components/common/table/Table";
import Pagination from "@/components/common/pagination/Pagination";
import Card from "@/components/common/card/Card";
import { tableSectionWrapper } from "./TableSection.css";

interface TableSectionProps<T> {
  title?: string;
  data: T[];
  columns: TableColumn<T>[];
  emptyText?: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  action?: ReactNode;
  className?: string;
}

export default function TableSection<T>({
  title,
  data,
  columns,
  emptyText = "데이터가 없습니다.",
  page = 0,
  totalPages = 0,
  onPageChange,
  action,
  className = "",
}: TableSectionProps<T>) {
  return (
    <Card
      shadow="none"
      padding={40}
      align="start"
      gap={16}
      className={className}
    >
      {title && <Text type="title4">{title}</Text>}
      <Divider thickness={1} color="gray300" />
      {action && action}
      <div className={tableSectionWrapper}>
        <Table data={data ?? []} columns={columns} emptyText={emptyText} />
        <Pagination
          currentPage={page}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </Card>
  );
}
