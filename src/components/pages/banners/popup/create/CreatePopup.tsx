'use client';
import CreateBanner from "@/components/pages/banners/common/CreateBanner";
import PopupForm from "@/components/pages/banners/popup/form/PopupForm";
import { queryKeys } from "@/constants/queryKeys";
import { useCreatePopup } from "@/api/banners/mutations/useCreatePopup";

export default function CreatePopup() {
	const { mutate } = useCreatePopup();

	return (
		<CreateBanner
			title='팝업'
			FormComponent={PopupForm}
			mutationFn={mutate}
			queryKeyToInvalidate={[queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST]}
			redirectPath="/banners/popup"
		/>
	);
}