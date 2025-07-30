import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import {
	BannerLeakedOrderDirection,
	TopBannerData,
	TopBannerFormValues,
} from "@/types/banners";

type BannerType = 'main' | 'popup' | 'myPage' | 'top';

// 파일 + JSON 데이터 FormData 로 변환
const createBannerFormData = (
	body: object,
	pcFile: File | null,
	mobileFile: File | null
): FormData => {
	const formData = new FormData();
	formData.append('requestDto', new Blob([JSON.stringify(body)], { type: 'application/json' }));
	if (pcFile) formData.append('pcFile', pcFile);
	if (mobileFile) formData.append('mobileFile', mobileFile);
	return formData;
}

// multipart/form-data 요청 (등록/수정)
const submitBanner = async (
	type: Extract<BannerType, 'main' | 'popup' | 'myPage'>,
	body: object,
	pcFile: File | null,
	mobileFile: File | null,
	id?: number
) => {
	const formData = createBannerFormData(body, pcFile, mobileFile);
	const url = `/api/banners/${type as string}${id ? `/${id}` : ''}`;
	try {
		const { data } = await axiosInstance.post(url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return data;
	} catch (error) {
		throw error;
	}
};

// 목록 조회 (Main / Popup)
const getBannerList = async <T>(
	type: Extract<BannerType, 'main' | 'popup'>,
	key: string,
	instance: AxiosInstance = axiosInstance
): Promise<T[]> => {
	try {
		const { data } = await instance.get(`/api/banners/${type}`);
		return (
			data._embedded?.[key]
				?.sort((a: any, b: any) => a.leakedOrder - b.leakedOrder)
				.map((item: any) => ({
					...item,
					thumbnail_pc: item._links?.thumbnail_pc?.href ?? '',
					thumbnail_mobile: item._links?.thumbnail_mobile?.href ?? '',
				})) ?? []
		);
	} catch (error) {
		throw error;
	}
};

// 상세 조회
const getBannerDetail = async <T>(
	type: Extract<BannerType, 'main' | 'popup' | 'myPage'>,
	id?: number,
	instance: AxiosInstance = axiosInstance
): Promise<T> => {
	const url = `/api/banners/${type}${id ? `/${id}` : ''}`;
	try {
		const { data } = await instance.get(url);
		return {
			...data,
			thumbnail_pc: data._links?.thumbnail_pc?.href ?? '',
			thumbnail_mobile: data._links?.thumbnail_mobile?.href ?? '',
		};
	} catch (error) {
		throw error;
	}
};

// 정렬 순서 변경 (up / down)
const updateBannerLeakedOrder = async (
	type: Extract<BannerType, 'main' | 'popup'>,
	id: number,
	direction: BannerLeakedOrderDirection
) => {
	try {
		const { data } = await axiosInstance.put(`/api/banners/${type}/${id}/${direction}`);
		return data;
	} catch (error) {
		throw error;
	}
};

// 삭제
const deleteBanner = async (type: Extract<BannerType, 'main' | 'popup'>, id: number) => {
	try {
		const { data } = await axiosInstance.delete(`/api/banners/${type}/${id}`);
		return data;
	} catch (error) {
		throw error;
	}
};

// TopBanner 조회
const getTopBanner = async (instance: AxiosInstance = axiosInstance): Promise<TopBannerData> => {
	try {
		const { data } = await instance.get(`/api/banners/top`);
		return data;
	} catch (error) {
		throw error;
	}
}

// TopBanner 수정
const updateTopBanner = async (bannerId: number, body: TopBannerFormValues) => {
	try {
		const { data } = await axiosInstance.put(`/api/banners/top/${bannerId}`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	submitBanner,
	getBannerDetail,
	getBannerList,
	updateBannerLeakedOrder,
	deleteBanner,
	getTopBanner,
	updateTopBanner,
}