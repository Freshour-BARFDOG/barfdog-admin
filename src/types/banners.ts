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


interface TopBannerData {
	id: number;
	name: string;
	status: string;
	backgroundColor: string;
	fontColor: string;
	pcLinkUrl: string;
	mobileLinkUrl: string;
}

interface TopBannerFormValues {
	name: string;
	status: BannerStatus;
	backgroundColor: string;
	fontColor: string;
	mobileLinkUrl: string;
	pcLinkUrl: string;
}

export type {
	BannerStatus,
	MyPageBannerData,
	MyPageBannerFormValues,
	TopBannerData,
	TopBannerFormValues,
}