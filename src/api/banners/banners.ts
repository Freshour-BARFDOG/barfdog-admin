import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import {
	BannerLeakedOrderDirection, MainBannerFormValues,
	MainBannerListrData,
	MyPageBannerData,
	MyPageBannerFormValues,
	TopBannerData,
	TopBannerFormValues,
} from "@/types/banners";

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

const getTopBanner = async (instance: AxiosInstance = axiosInstance): Promise<TopBannerData> => {
	try {
		const { data } = await instance.get(`/api/banners/top`);
		return data;
	} catch (error) {
		throw error;
	}
}

const updateTopBanner = async (bannerId: number, body: TopBannerFormValues) => {
	try {
		const { data } = await axiosInstance.put(`/api/banners/top/${bannerId}`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

const getMainBannerList = async (instance: AxiosInstance = axiosInstance): Promise<MainBannerListrData[]> => {
	try {
		const { data } = await instance.get(`/api/banners/main`);
		return data._embedded?.mainBannerListResponseDtoList
			.sort((a: MainBannerListrData, b: MainBannerListrData) => a.leakedOrder - b.leakedOrder)
			.map((banner: MainBannerListrData) => ({
				id: banner.id,
				leakedOrder: banner.leakedOrder,
				name: banner.name,
				targets: banner.targets,
				createdDate: banner.createdDate,
				modifiedDate: banner.modifiedDate,
				filenamePc: banner.filenamePc,
				filenameMobile: banner.filenameMobile,
				thumbnail_pc: banner._links.thumbnail_pc.href,
				thumbnail_mobile: banner._links.thumbnail_mobile.href,
			})) ?? [];
	} catch (error) {
		throw error;
	}
}

const updateMainBannerLeakedOrder = async (bannerId: number, direction: BannerLeakedOrderDirection) => {
	try {
		const { data } = await axiosInstance.put(`/api/banners/main/${bannerId}/${direction}`);
		return data;
	} catch (error) {
		throw error;
	}
}

const getMainBannerDetail = async (bannerId: number, instance: AxiosInstance = axiosInstance): Promise<MainBannerFormValues> => {
	try {
		const { data } = await instance.get(`/api/banners/main/${bannerId}`);
		return {
			id: data.id,
			name: data.name,
			targets: data.targets,
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

const submitMainBanner = async (
	body: MainBannerFormValues,
	pcFile: File | null,
	mobileFile: File | null,
	bannerId?: number
) => {
	const formData = new FormData();
	formData.append('requestDto', new Blob([JSON.stringify(body)], { type: 'application/json' }));

	if (pcFile) formData.append('pcFile', pcFile);
	if (mobileFile) formData.append('mobileFile', mobileFile);

	const url = bannerId
		? `/api/banners/main/${bannerId}`  // 수정
		: `/api/banners/main`;            // 등록

	try {
		const { data } = await axiosInstance.post(url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return data;
	} catch (error) {
		throw error;
	}
};

const deleteMainBanner = async (bannerId: number) => {
	try {
		const { data } = await axiosInstance.delete(`/api/banners/main/${bannerId}`);
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	getMyPageBanner,
	updateMyPageBanner,
	getTopBanner,
	updateTopBanner,
	getMainBannerList,
	updateMainBannerLeakedOrder,
	getMainBannerDetail,
	submitMainBanner,
	deleteMainBanner,
}