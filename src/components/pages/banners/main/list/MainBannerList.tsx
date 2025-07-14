'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import BannerList from "@/components/pages/banners/common/BannerList";
import { BANNER_TARGET } from "@/constants/banners";
import { MainBannerListrData } from "@/types/banners";
import { useGetMainBannerList } from "@/api/banners/queries/useGetMainBannerList";
import { useUpdateMainBannerLeakedOrder } from "@/api/banners/mutations/useUpdateMainBannerLeakedOrder";
import { useDeleteMainBanner } from "@/api/banners/mutations/useDeleteMainBanner";

export default function MainBannerList() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data } = useGetMainBannerList();

	const { mutate: updateLeakedOrder } = useUpdateMainBannerLeakedOrder();
	const { mutate: deleteMainBanner } = useDeleteMainBanner();

	const { addToast } = useToastStore();

	return (
		<BannerList
			title="메인 배너"
			data={data as MainBannerListrData[]}
			createHref="/banners/main/create"
			onEditClick={(row) => router.push(`/banners/main/${row.id}`)}
			onLeakedOrderUpdate={async (id, direction) => {
				updateLeakedOrder({
					bannerId: id,
					direction,
				}, {
					onSuccess: async () => {
						await queryClient.invalidateQueries({
							queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
						});
					},
					onError: (error) => {
						console.log(error)
						addToast('순서 편집에 실패했습니다.\n관리자에게 문의해주세요.');
					}
				})
			}}
			onDelete={async (id) => {
				deleteMainBanner({
					bannerId: id,
				}, {
					onSuccess: async () => {
						await queryClient.invalidateQueries({
							queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
						});
						addToast('메인 배너 삭제가 완료되었습니다!');
					},
					onError: (error) => {
						console.log(error)
						addToast('메인 배너 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
					}
				})
			}}
			columns={[
				{ key: 'name', header: '배너 이름' },
				{
					key: 'thumbnail_pc',
					header: '이미지',
					render: (row: MainBannerListrData) => <Image src={row.thumbnail_pc} alt={row.name} width={279} height={49} />,
				},
				{ key: 'targets', header: '노출 대상', render: (row: MainBannerListrData) => BANNER_TARGET[row.targets] },
				{ key: 'createdDate', header: '등록일', render: (row: MainBannerListrData) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
			]}
		/>
	);
}