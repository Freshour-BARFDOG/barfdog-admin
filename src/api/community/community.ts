import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import {
	ArticleDetailResponse,
	CommunityType, EventDetailResponse, EventImageType,
	NoticeDetailResponse, RecommendArticleBody,
	RecommendArticleListData,
	RecommendArticleResponse
} from "@/types/community";

// 블로그 명칭 convert
const convertArticleToBlogType = (type: CommunityType) => {
	if (type === 'article') return 'blogs'
		else return type;
}

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
	// type: Extract<CommunityType, 'notices' | 'events' | 'article'>,
	file: File | null,
) => {
	const formData = createUploadFile(file);
	// const url = `/api/admin/${type === 'notices' || type === 'article' ? 'blogs' : type}/image/upload`;
	const url = `/api/admin/blogs/image/upload`;
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
	type: Extract<CommunityType, 'notices' | 'events' | 'article'>,
	key: string,
	page: number,
	size: number,
	instance: AxiosInstance = axiosInstance
) => {
	try {
		const { data } = await instance.get(`/api/admin/${convertArticleToBlogType(type)}?page=${page}&size=${size}`);
		return {
			page: data.page,
			list: data._embedded?.[key] ?? []
		};
	} catch (error) {
		throw error;
	}
};

// 목록 삭제
const deleteCommunity = async (type: Extract<CommunityType, 'notices' | 'events' | 'article'>, id: number) => {
	try {
		const { data } = await axiosInstance.delete(`/api/admin/${convertArticleToBlogType(type)}/${id}`);
		return data;
	} catch (error) {
		throw error;
	}
};

// 등록
const createCommunity = async (
	type: Extract<CommunityType, 'notices' | 'events' | 'article'>,
	body: object,
) => {
	const url = `/api/admin/${convertArticleToBlogType(type)}`;
	try {
		const { data } = await axiosInstance.post(url, body);
		return data;
	} catch (error) {
		throw error;
	}
};

// 수정
const updateCommunity = async (
	type: Extract<CommunityType, 'notices' | 'events' | 'article'>,
	body: object,
	id: number,
) => {
	const url = `/api/admin/${convertArticleToBlogType(type)}/${id}`;
	try {
		const { data } = await axiosInstance.put(url, body);
		return data;
	} catch (error) {
		throw error;
	}
};

// 공지사항 상세 조회
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

// 아티클 상세 조회
const getArticleDetail = async (articleId: number, instance: AxiosInstance = axiosInstance): Promise<ArticleDetailResponse> => {
	try {
		const { data } = await instance.get(`/api/admin/blogs/${articleId}`);
		return {
			articleImageList: data?.adminBlogImageDtos,
			articleInfo: data?.blogAdminDto,
		};
	} catch (error) {
		throw error;
	}
}
// 이벤트 상세조회
const getEventDetail = async (eventId: number, instance: AxiosInstance = axiosInstance): Promise<EventDetailResponse> => {
	try {
		const { data } = await instance.get(`/api/admin/events/${eventId}`);
		return {
			eventImageList: data?.eventImageDtoList,
			eventInfo: data?.eventAdminDto,
		};
	} catch (error) {
		throw error;
	}
}
// 아티클 썸네일 업로드
const uploadThumbnailImage = async (file: File | null) => {
	const formData = createUploadFile(file);
	const url = `/api/admin/blogs/thumbnail/upload`;
	try {
		const { data } = await axiosInstance.post(url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return data;
	} catch (error) {
		throw error;
	}
};

const getRecommendArticle = async (instance: AxiosInstance = axiosInstance): Promise<RecommendArticleResponse> => {
	try {
		const { data } = await instance.get(`/api/admin/articles`);
		return {
			articleTitleList: data?.blogTitlesDtos.map((article: { blogId: number; title: string; }) => ({ 
				label: article.title, 
				value: article.blogId
			})),
			selectedArticleList:
				data?.articlesAdminDtos
					.filter((article: RecommendArticleListData) => article.blogId !== null)
					.sort((a: RecommendArticleListData, b: RecommendArticleListData) =>
						a.articleNumber - b.articleNumber
					)
			,
		};
	} catch (error) {
		throw error;
	}
}

const updateRecommendArticle = async (body: RecommendArticleBody) => {
	const url = `/api/admin/articles`;
	try {
		const { data } = await axiosInstance.put(url, body);
		return data;
	} catch (error) {
		throw error;
	}
};


const uploadEventImage = async (type: EventImageType, file: File | null) => {
	const formData = createUploadFile(file);
	const url = `/api/admin/events/${type}`;
	try {
		const { data } = await axiosInstance.post(url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export {
	uploadCommunityImage,
	getCommunityList,
	deleteCommunity,
	createCommunity,
	updateCommunity,
	getNoticeDetail,
	getArticleDetail,
	uploadThumbnailImage,
	getRecommendArticle,
	updateRecommendArticle,
	getEventDetail,
	uploadEventImage,
}