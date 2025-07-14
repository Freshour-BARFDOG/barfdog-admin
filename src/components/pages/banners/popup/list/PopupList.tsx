'use client';
import { commonWrapper } from "@/styles/common.css";
import { baseStyle, buttonVariants } from "@/components/common/button/Button.css";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import Divider from "@/components/common/divider/Divider";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { TableColumn } from "@/types/common";
import { BannerLeakedOrderDirection, PopupListData } from "@/types/banners";
import { POPUP_POSITION } from "@/constants/banners";
import { useGetPopupList } from "@/api/banners/queries/useGetPopupList";
import { useUpdatePopupLeakedOrder } from "@/api/banners/mutations/useUpdatePopupLeakedOrder";
import { useDeletePopup } from "@/api/banners/mutations/useDeletePopup";

export default function PopupList() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data } = useGetPopupList();

	const [editMode, setEditMode] = useState<boolean>(false);
	const { mutate: updateLeakedOrder } = useUpdatePopupLeakedOrder();
	
	const [deletePopup, setDeletePopup] = useState<PopupListData | null>(null);
	const { isOpen: isOpenDeleteConfirmModal, onClose: onCloseDeleteConfirmModal, onToggle: onToggleDeleteConfirmModal } = useModal();
	const { mutate: deletePopupMutate } = useDeletePopup();

	const { addToast } = useToastStore();

	const handleUpdateLeakedOrder = (popupId: number, direction: BannerLeakedOrderDirection) => {
		updateLeakedOrder({
			popupId,
			direction,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST],
				});
			},
			onError: (error) => {
				console.log(error)
			}
		})
	}

	const handleDeleteConfirm = (row: PopupListData) => {
		onToggleDeleteConfirmModal();
		setDeletePopup(row)
	}

	const handleDelete = () => {
		if(!deletePopup) return;

		deletePopupMutate({
			popupId: deletePopup?.id,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST],
				});
				addToast('팝업 삭제가 완료되었습니다!');
				setDeletePopup(null);
			},
			onError: (error) => {
				console.log(error)
				addToast('팝업 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	const columns: TableColumn<PopupListData>[] = [
		{
			key: 'leakedOrder',
			header: '순서',
			width: '60px',
			render: (row: PopupListData) => {
				if (editMode) {
					return (
						<div className={commonWrapper({ align: 'center', gap: 4 })}>
							<button onClick={() => handleUpdateLeakedOrder(row.id, 'up')} className={`${baseStyle} ${buttonVariants.outline.assistive}`}><ArrowUp size={16} /></button>
							<button onClick={() => handleUpdateLeakedOrder(row.id, 'down')} className={`${baseStyle} ${buttonVariants.outline.assistive}`}><ArrowDown size={16} /></button>
						</div>
					)
				} else {
					return row.leakedOrder;
				}
			}
		},
		{ key: 'name', header: '배너 이름' },
		{
			key: 'thumbnail_pc',
			header: '이미지',
			render: (row: PopupListData) => <Image src={row.thumbnail_pc} alt={row.name} width={60} height={60} />
		},
		{ key: 'position', header: '위치', render: (row: PopupListData) => POPUP_POSITION[row.position] },
		{ key: 'createdDate', header: '등록일', render: (row: PopupListData) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
		{
			key: 'edit',
			header: '수정',
			width: 80,
			render: (row: PopupListData) => (
				<Button
					onClick={() => router.push(`/banners/popup/${row.id}`)}
					size='sm'
				>
					수정
				</Button>
			),
		},
		{
			key: 'delete',
			header: '삭제',
			width: 80,
			render: (row: PopupListData) => (
				<Button
					variant='outline'
					type='assistive'
					onClick={() => handleDeleteConfirm(row)}
					size='sm'
				>
					삭제
				</Button>
			),
		},
	]
	return (
		<>
			<Card shadow='none' padding={20} gap={16}>
				<div className={commonWrapper({ justify: 'between', align: 'center'})}>
					<Text type='title4'>목록</Text>
					<Button onClick={() => router.push('/banners/popup/create')} variant='solid'>팝업 등록</Button>
				</div>
				<Divider thickness={1} color='gray300' />
				<TableSection
					data={data as PopupListData[]}
					columns={columns}
					page={0}
					totalPages={0}
					padding='none'
					emptyText='팝업 목록 데이터가 없습니다.'
					action={
						<>
						<Button
							variant="outline"
							type="assistive"
							size="sm"
							onClick={() => setEditMode(prev => !prev)}
						>
							순서 편집 {editMode ? '닫기' : ''}
						</Button>
						</>
					}
				/>
			</Card>
			{isOpenDeleteConfirmModal && 
				<AlertModal
					title='정말 삭제하시겠습니까?'
					content={`팝업 이름: ${deletePopup?.name}`}
					isOpen={isOpenDeleteConfirmModal}
					onClose={onCloseDeleteConfirmModal}
					cancelText='취소'
					confirmText='확인'
					onConfirm={handleDelete}
				/>
			}
		</>
	);
}