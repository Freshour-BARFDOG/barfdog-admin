'use client';
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { StatusType } from "@/types/common";
import { useGetMyPageBanner } from "@/api/banners/queries/useGetMyPageBanner";
import { useUpdateMyPageBanner } from "@/api/banners/mutations/useUpdateMyPageBanner";
import BannerDetail from "@/components/pages/banners/common/BannerDetail";
import MyPageBannerForm from "@/components/pages/banners/myPage/MyPageBannerForm";

export default function MyPageBanner() {
	const queryClient = useQueryClient();
	
	const { data } = useGetMyPageBanner();
	const { mutate } = useUpdateMyPageBanner();

	if(!data) return null;
	return (
		<BannerDetail
			id={data.id}
			title='마이페이지 배너'
			data={data}
			defaultFormValues={(data) => ({
				name: data?.name ?? '',
				status: data?.status ?? 'LEAKED' as StatusType,
				pcLinkUrl: data?.pcLinkUrl ?? '',
				mobileLinkUrl: data?.mobileLinkUrl ?? '',
				thumbnail_pc: data?.thumbnail_pc ?? '',
				filenamePc: data?.filenamePc ?? '',
				thumbnail_mobile: data?.thumbnail_mobile ?? '',
				filenameMobile: data?.filenameMobile ?? '',
			})}
			mutateFn={({ id, body, pcFile, mobileFile }) =>
				mutate({ bannerId: id, body, pcFile, mobileFile }, {
					onSuccess: async () => {
						await queryClient.invalidateQueries({
							queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MYPAGE_BANNER],
						});
					},
					onError: (error) => {
						console.log(error);
					}
				})
			}
			FormComponent={MyPageBannerForm}
		/>
	);
}