import { BANNER_TARGET, POPUP_POSITION } from "@/constants/banners";
import { STATUS } from "@/constants/common";
import { StatusType } from "@/types/common";

type BannerTarget = keyof typeof BANNER_TARGET;

type BannerLeakedOrderDirection = 'up' | 'down';

interface BaseBannerData {
	id: number;
	name: string;
	status: StatusType;
	filenamePc: string;
	filenameMobile: string;
	pcLinkUrl: string;
	mobileLinkUrl: string;
	thumbnail_pc: string;
	thumbnail_mobile?: string;
}

interface BaseBannerFormValues {
	name: string;
	status: StatusType;
	pcLinkUrl: string;
	mobileLinkUrl: string;
	filenamePc?: string;
	filenameMobile?: string;
	thumbnail_pc?: string;
	thumbnail_mobile?: string;
}

type MyPageBannerData = BaseBannerData
type MyPageBannerFormValues = BaseBannerFormValues

interface TopBannerData extends BaseBannerData {
	backgroundColor: string;
	fontColor: string;
}

interface TopBannerFormValues extends BaseBannerFormValues {
	backgroundColor: string;
	fontColor: string;
}

interface MainBannerListrData extends Omit<BaseBannerData, 'status'> {
	leakedOrder: number;
	targets: BannerTarget;
	createdDate: string;
	modifiedDate: string;
	_links?: any;
}

interface MainBannerFormValues extends BaseBannerFormValues {
	id?: number;
	targets: BannerTarget;
}

type PopupPosition = keyof typeof POPUP_POSITION;

interface PopupListData extends BaseBannerData {
	leakedOrder: number;
	position: PopupPosition;
	createdDate: string;
	modifiedDate: string;
	_links?: any;
}

interface PopupFormValues extends BaseBannerFormValues {
	id?: number;
	position: PopupPosition;
}

export type {
	MyPageBannerData,
	MyPageBannerFormValues,
	TopBannerData,
	TopBannerFormValues,
	BannerTarget,
	MainBannerListrData,
	BannerLeakedOrderDirection,
	MainBannerFormValues,
	PopupPosition,
	PopupListData,
	PopupFormValues,
}