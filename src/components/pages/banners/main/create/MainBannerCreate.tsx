'use client';
import BannerCreate from "@/components/pages/banners/common/BannerCreate";
import MainBannerForm from "@/components/pages/banners/main/form/MainBannerForm";
import { queryKeys } from "@/constants/queryKeys";
import { useCreateMainBanner } from "@/api/banners/mutations/useCreateMainBanner";

export default function MainBannerCreate() {
	const { mutate } = useCreateMainBanner();

	return (
		<BannerCreate
			title='메인 배너'
			FormComponent={MainBannerForm}
			mutationFn={mutate}
			queryKeyToInvalidate={[queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST]}
			redirectPath="/banners/main"
		/>
	);
}