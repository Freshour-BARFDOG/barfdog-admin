import { useState } from 'react';
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp } from 'lucide-react';
import { commonWrapper } from '@/styles/common.css';
import { baseStyle, buttonVariants } from "@/components/common/button/Button.css";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import TableSection from "@/components/common/tableSection/TableSection";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { TableColumn } from "@/types/common";
import { BannerLeakedOrderDirection } from '@/types/banners';

interface BannerListProps<T> {
	title: string;
	data: T[];
	columns: TableColumn<T>[];
	createHref: string;
	onEditClick: (row: T) => void;
	onDelete: (id: number) => Promise<void>;
	onLeakedOrderUpdate: (id: number, direction: BannerLeakedOrderDirection) => Promise<void>;
}

export default function BannerList<T extends { id: number; name: string; leakedOrder: number }>({
	title,
	data,
	columns,
	createHref,
	onEditClick,
	onDelete,
	onLeakedOrderUpdate,
}: BannerListProps<T>) {
	const router = useRouter();
	const [editMode, setEditMode] = useState(false);
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
		{
			key: 'leakedOrder',
			header: '순서',
			width: '60px',
			render: (row: T) =>
				editMode ? (
					<div className={commonWrapper({ align: 'center', gap: 4 })}>
						{['up', 'down'].map(dir => (
							<button
								key={dir}
								onClick={() => onLeakedOrderUpdate(row.id, dir as BannerLeakedOrderDirection)}
								className={`${baseStyle} ${buttonVariants.outline.assistive}`}
							>
								{dir === 'up'
									? <ArrowUp size={16} />
									: <ArrowDown size={16} />
								}
							</button>
						))}
					</div>
				) : (
					row.leakedOrder
				),
		},
		...columns,
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
					page={0}
					totalPages={0}
					padding="none"
					emptyText={`${title} 목록 데이터가 없습니다.`}
					action={
						<Button
							variant="outline"
							type="assistive"
							size="sm"
							onClick={() => setEditMode((prev) => !prev)}
						>
							순서 편집 {editMode ? '닫기' : ''}
						</Button>
					}
				/>
			</Card>
			{isOpenDeleteConfirmModal && (
				<AlertModal
					title="정말 삭제하시겠습니까?"
					content={`${title} 이름: ${deleteTarget?.name}`}
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