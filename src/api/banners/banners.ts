import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { MyPageBannerData, MyPageBannerFormValues } from "@/types/banners";

const getMyPageBanner = async (instance: AxiosInstance = axiosInstance): Promise<MyPageBannerData> => {
	try {
		const { data } = await instance.get(`/api/banners/myPage`);
		return {
			id: data.id,
			name: data.name,
			status: data.status,
			filenamePc: data.filenamePc,
			filenameMobile: data.filenameMobile,
			pcLinkUrl: data.pcLinkUrl,
			mobileLinkUrl: data.mobileLinkUrl,
			thumbnail_pc: data?._links.thumbnail_pc.href,
			thumbnail_mobile: data?._links.thumbnail_mobile.href,
		};
	} catch (error) {
		throw error;
	}
}

const updateMyPageBanner = async (bannerId: number, body: MyPageBannerFormValues, pcFile: File | null, mobileFile: File | null) => {
	const formData = new FormData();
	formData.append('requestDto', new Blob([JSON.stringify(body)], { type: 'application/json' }));

	if (pcFile) formData.append('pcFile', pcFile);
	if (mobileFile) formData.append('mobileFile', mobileFile);
	try {
		const { data } = await axiosInstance.post(`/api/banners/myPage/${bannerId}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	getMyPageBanner,
	updateMyPageBanner,
}