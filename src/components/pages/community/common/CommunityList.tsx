import {ReactNode, useState} from 'react';
import { useRouter } from "next/navigation";
import { commonWrapper } from '@/styles/common.css';
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import TableSection from "@/components/common/tableSection/TableSection";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { Page, TableColumn } from "@/types/common";
import { getTableRowNumber } from "@/utils/getTableRowNumber";

interface CommunityListProps<T> {
	title: string;
	data: T[];
	page: number;
	onChangePage: (page: number) => void;
	pageData: Page;
	columns: TableColumn<T>[];
	createHref: string;
	onEditClick: (row: T) => void;
	onDelete: (id: number) => Promise<void>;
	action?: ReactNode;
}

export default function CommunityList<T extends { id: number; title: string; }>({
	title,
	data,
	page,
	onChangePage,
	pageData,
	columns,
	createHref,
	onEditClick,
	onDelete,
	action,
}: CommunityListProps<T>) {
	const router = useRouter();
	const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

	const { isOpen: isOpenDeleteConfirmModal, onClose: onCloseDeleteConfirmModal, onToggle: onToggleDeleteConfirmModal } = useModal();

	const handleDeleteConfirm = (row: T) => {
		onToggleDeleteConfirmModal();
		setDeleteTarget(row);
	};

	const handleDelete = async () => {
		if (!deleteTarget) return;
		await onDelete(deleteTarget?.id);
		setDeleteTarget(null);
	};

	const enhancedColumns: TableColumn<T>[] = [
		{ key: 'seq', header: '번호', width: '60px',
			render: (row: T, index: number) =>
				getTableRowNumber({
					totalElements: pageData.totalElements as number,
					currentPage: pageData.number as number,
					pageSize: pageData.size as number,
					index,
				}).toString(),
		},
		...columns,
		{ key: 'id', header: 'ID', width: '60px', },
		{
			key: 'edit',
			header: '수정',
			width: 80,
			render: (row: T) => (
				<Button onClick={() => onEditClick(row)} size="sm">
					수정
				</Button>
			),
		},
		{
			key: 'delete',
			header: '삭제',
			width: 80,
			render: (row: T) => (
				<Button variant="outline" type="assistive" onClick={() => handleDeleteConfirm(row)} size="sm">
					삭제
				</Button>
			),
		},
	];
	return (
		<>
			<Card shadow="none" padding={20} gap={16}>
				<div className={commonWrapper({ justify: 'between', align: 'center' })}>
					<Text type="title4">목록</Text>
					<Button onClick={() => router.push(createHref)} variant="solid">
						등록
					</Button>
				</div>
				<Divider thickness={1} color="gray300" />
				<TableSection
					data={data}
					columns={enhancedColumns}
					page={page}
					onPageChange={onChangePage}
					totalPages={pageData?.totalPages ?? 0}
					padding="none"
					emptyText={`${title} 목록 데이터가 없습니다.`}
					action={action}
				/>
			</Card>
			{isOpenDeleteConfirmModal && (
				<AlertModal
					title="정말 삭제하시겠습니까?"
					content={`${title} 이름: ${deleteTarget?.title}`}
					isOpen={isOpenDeleteConfirmModal}
					onClose={() => {
						onCloseDeleteConfirmModal();
						setDeleteTarget(null);
					}}
					cancelText="취소"
					confirmText="확인"
					onConfirm={handleDelete}
				/>
			)}
		</>
	);
}