'use client';
import BannerCreate from "@/components/pages/banners/common/BannerCreate";
import PopupForm from "@/components/pages/banners/popup/form/PopupForm";
import { queryKeys } from "@/constants/queryKeys";
import { useCreatePopup } from "@/api/banners/mutations/useCreatePopup";

export default function PopupCreate() {
	const { mutate } = useCreatePopup();

	return (
		<BannerCreate
			title='팝업'
			FormComponent={PopupForm}
			mutationFn={mutate}
			queryKeyToInvalidate={[queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST]}
			redirectPath="/banners/popup"
		/>
	);
}