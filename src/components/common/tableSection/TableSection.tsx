import { CSSProperties, ReactNode } from "react";
import { TableColumn } from "@/types/common";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import Table from "@/components/common/table/Table";
import Pagination from "@/components/common/pagination/Pagination";
import Card from "@/components/common/card/Card";

interface TableSectionProps<T> {
	title?: string;
	data: T[];
	columns: TableColumn<T>[];
	emptyText?: string;
	page: number;
	totalPages: number;
	onPageChange?: (page: number) => void;
	action?: ReactNode;
	className?: string;
	padding?: 'none' | 20 | 40;
	getRowStyle?: (row: T, rowIndex: number) => CSSProperties;
}

export default function TableSection<T>({
	title,
	data,
	columns,
	emptyText = '데이터가 없습니다.',
	page = 0,
	totalPages = 0,
	onPageChange,
	action,
	className = '',
	padding = 40,
	getRowStyle,
}: TableSectionProps<T>) {
	return (
		<Card shadow='none' padding={padding} align='start' gap={16} className={className}>
			{title && (
				<>
				<Text type='title4'>{title}</Text>
				<Divider thickness={1} color='gray300' />
				</>
			)}
			{action && action}
			<div style={{ width: '100%' }}>
				<Table data={data ?? []} columns={columns} emptyText={emptyText} getRowStyle={getRowStyle} />
				{onPageChange &&
					<Pagination currentPage={page} onPageChange={onPageChange} totalPages={totalPages} />
				}
			</div>
		</Card>
	);
}
