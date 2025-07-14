import { BANNER_STATUS, BANNER_TARGET } from "@/constants/banners";

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

type BannerTarget = keyof typeof BANNER_TARGET;

type BannerLeakedOrderDirection = 'up' | 'down';

interface MainBannerListrData {
	id: number;
	leakedOrder: number;
	name: string;
	targets: BannerTarget;
	createdDate: string;
	modifiedDate: string;
	filenamePc: string;
	filenameMobile: string;
	thumbnail_pc: string;
	thumbnail_mobile: string;
	_links?: any;
}

interface MainBannerFormValues {
	id?: number;
	name: string;
	targets: BannerTarget;
	status: BannerStatus;
	filenamePc?: string;
	filenameMobile?: string;
	pcLinkUrl: string;
	mobileLinkUrl: string;
	thumbnail_pc?: string;
	thumbnail_mobile?: string;
}

export type {
	BannerStatus,
	MyPageBannerData,
	MyPageBannerFormValues,
	TopBannerData,
	TopBannerFormValues,
	BannerTarget,
	MainBannerListrData,
	BannerLeakedOrderDirection,
	MainBannerFormValues,
}