'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import BannerList from "@/components/pages/banners/common/BannerList";
import { POPUP_POSITION } from "@/constants/banners";
import { PopupListData } from "@/types/banners";
import { useGetPopupList } from "@/api/banners/queries/useGetPopupList";
import { useUpdatePopupLeakedOrder } from "@/api/banners/mutations/useUpdatePopupLeakedOrder";
import { useDeletePopup } from "@/api/banners/mutations/useDeletePopup";

export default function PopupList() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data } = useGetPopupList();

	const { mutate: updateLeakedOrder } = useUpdatePopupLeakedOrder();
	const { mutate: deletePopupMutate } = useDeletePopup();

	const { addToast } = useToastStore();

	return (
		<BannerList
			title="팝업"
			data={data as PopupListData[]}
			createHref="/banners/popup/create"
			onEditClick={(row) => router.push(`/banners/popup/${row.id}`)}
			onLeakedOrderUpdate={async (id, direction) => {
				updateLeakedOrder({
					popupId: id,
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
			}}
			onDelete={async (id) => {
				deletePopupMutate({
					popupId: id,
				}, {
					onSuccess: async () => {
						await queryClient.invalidateQueries({
							queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST],
						});
						addToast('팝업 삭제가 완료되었습니다!');
					},
					onError: (error) => {
						console.log(error)
						addToast('팝업 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
					}
				})
			}}
			columns={[
				{ key: 'name', header: '배너 이름' },
				{
					key: 'thumbnail_pc',
					header: '이미지',
					render: (row: PopupListData) => <Image src={row.thumbnail_pc} alt={row.name} width={60} height={60} />
				},
				{ key: 'position', header: '위치', render: (row: PopupListData) => POPUP_POSITION[row.position] },
				{ key: 'createdDate', header: '등록일', render: (row: PopupListData) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
			]}
		/>
	);
}