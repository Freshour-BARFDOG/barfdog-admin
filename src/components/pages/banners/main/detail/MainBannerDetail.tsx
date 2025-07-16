'use client';
import BannerDetail from "@/components/pages/banners/common/BannerDetail";
import MainBannerForm from "@/components/pages/banners/main/form/MainBannerForm";
import { queryKeys } from "@/constants/queryKeys";
import { StatusType } from "@/types/common";
import { useGetMainBannerDetail } from "@/api/banners/queries/useGetMainBannerDetail";
import { useUpdateMainBanner } from "@/api/banners/mutations/useUpdateMainBanner";

interface MainBannerDetailProps {
	bannerId: number;
}

export default function MainBannerDetail({ bannerId }: MainBannerDetailProps) {
	const { data } = useGetMainBannerDetail(bannerId);
	const { mutate } = useUpdateMainBanner();

	return (
		<BannerDetail
			id={bannerId}
			title='메인 배너'
			data={data}
			defaultFormValues={(data) => ({
				name: data?.name ?? '',
				targets: data?.targets ?? 'ALL',
				status: data?.status ?? 'LEAKED' as StatusType,
				pcLinkUrl: data?.pcLinkUrl ?? '',
				mobileLinkUrl: data?.mobileLinkUrl ?? '',
				thumbnail_pc: data?.thumbnail_pc ?? '',
				filenamePc: data?.filenamePc ?? '',
				thumbnail_mobile: data?.thumbnail_mobile ?? '',
				filenameMobile: data?.filenameMobile ?? '',
			})}
			mutateFn={({ id, body, pcFile, mobileFile }) =>
				mutate({ bannerId: id, body, pcFile, mobileFile })
			}
			queryKeysToInvalidate={[
				[queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
				[queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_DETAIL, bannerId]
			]}
			FormComponent={MainBannerForm}
		/>
	);
}