import { BANNER_STATUS } from "@/constants/banners";

type BannerStatus = keyof typeof BANNER_STATUS;

interface MyPageBannerData {
	id: number;
	name: string;
	status: BannerStatus;
	filenamePc: string;
	filenameMobile: string;
	pcLinkUrl: string;
	mobileLinkUrl: string;
	thumbnail_pc: string;
	thumbnail_mobile: string;
}

interface MyPageBannerFormValues {
	name: string;
	status: BannerStatus;
	pcLinkUrl: string;
	mobileLinkUrl: string;
}

export type {
	BannerStatus,
	MyPageBannerData,
	MyPageBannerFormValues,
}