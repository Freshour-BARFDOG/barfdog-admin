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
import { BannerLeakedOrderDirection, MainBannerListrData } from "@/types/banners";
import { BANNER_TARGET } from "@/constants/banners";
import { useGetMainBannerList } from "@/api/banners/queries/useGetMainBannerList";
import { useUpdateMainBannerLeakedOrder } from "@/api/banners/mutations/useUpdateMainBannerLeakedOrder";
import { useDeleteMainBanner } from "@/api/banners/mutations/useDeleteMainBanner";

export default function MainBannerList() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data } = useGetMainBannerList();

	
	const [editMode, setEditMode] = useState<boolean>(false);
	const { mutate: updateLeakedOrder } = useUpdateMainBannerLeakedOrder();
	
	const [deleteBanner, setDeleteBanner] = useState<MainBannerListrData | null>(null);
	const { isOpen: isOpenDeleteConfirmModal, onClose: onCloseDeleteConfirmModal, onToggle: onToggleDeleteConfirmModal } = useModal();
	const { mutate: deleteMainBanner } = useDeleteMainBanner();

	const { addToast } = useToastStore();

	const handleUpdateLeakedOrder = (bannerId: number, direction: BannerLeakedOrderDirection) => {
		updateLeakedOrder({
			bannerId,
			direction,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
				});
			},
			onError: (error) => {
				console.log(error)
			}
		})
	}

	const handleDeleteConfirm = (row: MainBannerListrData) => {
		onToggleDeleteConfirmModal();
		setDeleteBanner(row)
	}

	const handleDelete = () => {
		if(!deleteBanner) return;

		deleteMainBanner({
			bannerId: deleteBanner?.id,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
				});
				addToast('메인 배너 삭제가 완료되었습니다!');
				setDeleteBanner(null);
			},
			onError: (error) => {
				console.log(error)
				addToast('메인 배너 등록에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	const columns: TableColumn<MainBannerListrData>[] = [
		{
			key: 'leakedOrder',
			header: '순서',
			width: '60px',
			render: (row: MainBannerListrData) => {
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
			render: (row: MainBannerListrData) => <Image src={row.thumbnail_pc} alt={row.name} width={279} height={49} />
		},
		{ key: 'targets', header: '노출 대상', render: (row: MainBannerListrData) => BANNER_TARGET[row.targets] },
		{ key: 'createdDate', header: '등록일', render: (row: MainBannerListrData) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
		{
			key: 'edit',
			header: '수정',
			render: (row: MainBannerListrData) => (
				<Button
					onClick={() => router.push(`/banners/main/${row.id}`)}
					size='sm'
				>
					수정
				</Button>
			),
		},
		{
			key: 'delete',
			header: '삭제',
			render: (row: MainBannerListrData) => (
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
					<Button onClick={() => router.push('/banners/main/create')} variant='solid'>배너 등록</Button>
				</div>
				<Divider thickness={1} color='gray300' />
				<TableSection
					data={data as MainBannerListrData[]}
					columns={columns}
					page={0}
					totalPages={0}
					padding='none'
					emptyText='메인 배너 목록 데이터가 없습니다.'
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
					content={`배너 이름: ${deleteBanner?.name}`}
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