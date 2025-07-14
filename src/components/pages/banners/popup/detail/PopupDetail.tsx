'use client';
import BannerDetail from "@/components/pages/banners/common/BannerDetail";
import PopupForm from "@/components/pages/banners/popup/form/PopupForm";
import { queryKeys } from "@/constants/queryKeys";
import { BannerStatus } from "@/types/banners";
import { useGetPopupDetail } from "@/api/banners/queries/useGetPopupDetail";
import { useUpdatePopup } from "@/api/banners/mutations/useUpdatePopup";

interface MainBannerDetailProps {
	popupId: number;
}

export default function PopupDetail({ popupId }: MainBannerDetailProps) {
	const { data } = useGetPopupDetail(popupId);
	const { mutate } = useUpdatePopup();

	return (
		<BannerDetail
			id={popupId}
			title='팝업'
			data={data}
			defaultFormValues={(data) => ({
				name: data?.name ?? '',
				position: data?.position ?? 'LEFT',
				status: data?.status ?? 'LEAKED' as BannerStatus,
				pcLinkUrl: data?.pcLinkUrl ?? '',
				mobileLinkUrl: data?.mobileLinkUrl ?? '',
				thumbnail_pc: data?.thumbnail_pc ?? '',
				filenamePc: data?.filenamePc ?? '',
				thumbnail_mobile: data?.thumbnail_mobile ?? '',
				filenameMobile: data?.filenameMobile ?? '',
			})}
			mutateFn={({ id, body, pcFile, mobileFile }) =>
				mutate({ popupId: id, body, pcFile, mobileFile })
			}
			queryKeysToInvalidate={[
				[queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST],
				[queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_DETAIL, popupId]
			]}
			FormComponent={PopupForm}
		/>
	);
}