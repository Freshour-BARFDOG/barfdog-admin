'use client';
import { useState } from "react";
import Card from "@/components/common/card/Card";
import PopupForm from "@/components/pages/banners/popup/form/PopupForm";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { BannerStatus, PopupFormValues } from "@/types/banners";
import { useGetPopupDetail } from "@/api/banners/queries/useGetPopupDetail";
import { useUpdatePopup } from "@/api/banners/mutations/useUpdatePopup";

interface MainBannerDetailProps {
	popupId: number;
}

export default function PopupDetail({ popupId }: MainBannerDetailProps) {
	const queryClient = useQueryClient();
	const { data } = useGetPopupDetail(popupId);
	const { mutate } = useUpdatePopup();

	const [pcFile, setPcFile] = useState<File | null>(null);
	const [mobileFile, setMobileFile] = useState<File | null>(null);

	const { addToast } = useToastStore();

	const defaultUpdateFormValue = {
		name: data?.name ?? '',
		position: data?.position ?? 'LEFT',
		status: data?.status ?? 'LEAKED' as BannerStatus,
		pcLinkUrl: data?.pcLinkUrl ?? '',
		mobileLinkUrl: data?.mobileLinkUrl ?? '',
		thumbnail_pc: data?.thumbnail_pc ?? '',
		filenamePc: data?.filenamePc ?? '',
		thumbnail_mobile: data?.thumbnail_mobile ?? '',
		filenameMobile: data?.filenameMobile ?? '',
	}

	const onSubmit = (formValues: PopupFormValues) => {
		if(!data) return;
		console.log('formValues', formValues)
		
		mutate({
			popupId: data.id!,
			body: formValues,
			pcFile,
			mobileFile,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST],
				});
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_DETAIL, popupId],
				});
				setPcFile(null);
				setMobileFile(null);
				addToast('팝업 수정이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('팝업 수정에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<Card shadow='none' padding={20}>
			<PopupForm
				defaultUpdateFormValue={defaultUpdateFormValue}
				onSubmit={onSubmit}
				setPcFile={setPcFile}
				setMobileFile={setMobileFile}
				isValidFiles={true}
			/>
		</Card>
	);
}