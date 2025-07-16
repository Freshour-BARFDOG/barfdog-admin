import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { NoticeDetailResponse } from "@/types/community";

type CommunityType = 'notices' | 'event' | 'article';

// 파일 + JSON 데이터 FormData 로 변환
const createUploadFile = (
	file: File | null,
): FormData => {
	const formData = new FormData();
	if (file) formData.append('file', file);
	return formData;
}

// 이미지 업로드
const uploadCommunityImage = async (
	type: Extract<CommunityType, 'notices' | 'event' | 'article'>,
	file: File | null,
) => {
	const formData = createUploadFile(file);
	const url = `/api/admin/${type as string === 'notices' ? 'blogs' : type}/image/upload`;
	try {
		const { data } = await axiosInstance.post(url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return data;
	} catch (error) {
		throw error;
	}
};

// 목록 조회
const getCommunityList = async(
	type: Extract<CommunityType, 'notices' | 'event' | 'article'>,
	key: string,
	page: number,
	size: number,
	instance: AxiosInstance = axiosInstance
) => {
	try {
		const { data } = await instance.get(`/api/admin/${type}?page=${page}&size=${size}`);
		return {
			page: data.page,
			list: data._embedded?.[key] ?? []
		};
	} catch (error) {
		throw error;
	}
};

// 목록 삭제
const deleteCommunity = async (type: Extract<CommunityType, 'notices' | 'event' | 'article'>, id: number) => {
	try {
		const { data } = await axiosInstance.delete(`/api/admin/${type}/${id}`);
		return data;
	} catch (error) {
		throw error;
	}
};

// 등록
const createCommunity = async (
	type: Extract<CommunityType, 'notices' | 'event' | 'article'>,
	body: object,
) => {
	const url = `/api/admin/${type as string}`;
	try {
		const { data } = await axiosInstance.post(url, body);
		return data;
	} catch (error) {
		throw error;
	}
};

// 수정
const updateCommunity = async (
	type: Extract<CommunityType, 'notices' | 'event' | 'article'>,
	body: object,
	id: number,
) => {
	const url = `/api/admin/${type as string}/${id}`;
	try {
		const { data } = await axiosInstance.put(url, body);
		return data;
	} catch (error) {
		throw error;
	}
};

const getNoticeDetail = async (noticeId: number, instance: AxiosInstance = axiosInstance): Promise<NoticeDetailResponse> => {
	try {
		const { data } = await instance.get(`/api/admin/notices/${noticeId}`);
		return {
			noticeImageList: data?.adminBlogImageDtos,
			noticeInfo: data?.noticeAdminDto,
		};
	} catch (error) {
		throw error;
	}
}



export {
	uploadCommunityImage,
	getCommunityList,
	deleteCommunity,
	createCommunity,
	updateCommunity,
	getNoticeDetail,
}