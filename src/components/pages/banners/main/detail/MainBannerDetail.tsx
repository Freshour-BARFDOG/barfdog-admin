'use client';
import { useState } from "react";
import Card from "@/components/common/card/Card";
import MainBannerForm from "@/components/pages/banners/main/form/MainBannerForm";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { BannerStatus, MainBannerFormValues } from "@/types/banners";
import { useGetMainBannerDetail } from "@/api/banners/queries/useGetMainBannerDetail";
import { useUpdateMainBanner } from "@/api/banners/mutations/useUpdateMainBanner";

interface MainBannerDetailProps {
	bannerId: number;
}

export default function MainBannerDetail({ bannerId }: MainBannerDetailProps) {
	const queryClient = useQueryClient();
	const { data } = useGetMainBannerDetail(bannerId);
	const { mutate } = useUpdateMainBanner();

	const [pcFile, setPcFile] = useState<File | null>(null);
	const [mobileFile, setMobileFile] = useState<File | null>(null);

	const { addToast } = useToastStore();

	const defaultUpdateFormValue = {
		name: data?.name ?? '',
		targets: data?.targets ?? 'ALL',
		status: data?.status ?? 'LEAKED' as BannerStatus,
		pcLinkUrl: data?.pcLinkUrl ?? '',
		mobileLinkUrl: data?.mobileLinkUrl ?? '',
		thumbnail_pc: data?.thumbnail_pc ?? '',
		filenamePc: data?.filenamePc ?? '',
		thumbnail_mobile: data?.thumbnail_mobile ?? '',
		filenameMobile: data?.filenameMobile ?? '',
	}

	const onSubmit = (formValues: MainBannerFormValues) => {
		if(!data) return;
		
		mutate({
			bannerId: data.id!,
			body: formValues,
			pcFile,
			mobileFile,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
				});
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_DETAIL, bannerId],
				});
				setPcFile(null);
				setMobileFile(null);
				addToast('메인 배너 수정이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('메인 배너 수정에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<Card shadow='none' padding={20}>
			<MainBannerForm
				defaultUpdateFormValue={defaultUpdateFormValue}
				onSubmit={onSubmit}
				setPcFile={setPcFile}
				setMobileFile={setMobileFile}
				isValidFiles={true}
			/>
		</Card>
	);
}