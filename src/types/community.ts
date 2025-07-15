import { Page, StatusType } from "@/types/common";

interface UploadResponse {
	id: number;
	url: string;
}

interface NoticeListData {
	id: number;
	title: string;
	createdDate: string;
	status: StatusType;
}

interface NoticeListResponse {
	list: NoticeListData[];
	page: Page;
}

interface NoticeImageData {
	blogImageId: number;
	filename: string;
	url: string;
}

interface NoticeInfoData {
	id?: number;
	status: StatusType;
	title: string;
	contents: string;
}

interface NoticeDetailResponse {
	noticeImageList: NoticeImageData[];
	noticeInfo: NoticeInfoData;
}

interface NoticeFormValues extends NoticeInfoData {
	addImageIdList: number[];
	deleteImageIdList: number[];
}

interface CreateNoticeFormValues extends NoticeInfoData {
	noticeImageIdList: number[];
}

export type {
	UploadResponse,
	NoticeListData,
	NoticeListResponse,
	NoticeInfoData,
	NoticeDetailResponse,
	NoticeFormValues,
	CreateNoticeFormValues,
}