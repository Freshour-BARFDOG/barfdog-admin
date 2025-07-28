import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import {
	ArticleDetailResponse,
	CommunityType,
	EventDetailResponse,
	EventImageType,
	InquiryAnswerData,
	InquiryQuestionData, InquiryDetailData,
	InquiryListResponse,
	InquiryListSearchParams,
	NoticeDetailResponse,
	RecommendArticleBody,
	RecommendArticleListData,
	RecommendArticleResponse
} from "@/types/community";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { INQUIRY_LIST_INITIAL_SEARCH_VALUES } from "@/constants/community";
import { PAGE_SIZE } from "@/constants/common";

// ===== 유틸리티 함수들 =====
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

// ===== 커뮤니티 공통 API =====
export const communityCommonApi = {
	getCommunityList: async(
		type: Extract<CommunityType, 'notices' | 'events' | 'article' | 'questions'>,
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
	},
	deleteCommunity: async (type: Extract<CommunityType, 'notices' | 'events' | 'article' | 'questions'>, id: number) => {
		try {
			const { data } = await axiosInstance.delete(`/api/admin/${convertArticleToBlogType(type)}/${id}`);
			return data;
		} catch (error) {
			throw error;
		}
	},
	createCommunity: async (
		type: Extract<CommunityType, 'notices' | 'events' | 'article' | 'questions'>,
		body: object,
	) => {
		const url = `/api/admin/${convertArticleToBlogType(type)}`;
		try {
			const { data } = await axiosInstance.post(url, body);
			return data;
		} catch (error) {
			throw error;
		}
	},
	updateCommunity: async (
		type: Extract<CommunityType, 'notices' | 'events' | 'article' | 'questions'>,
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
	},
	uploadCommunityImage: async (
		file: File | null,
	) => {
		const formData = createUploadFile(file);
		const url = `/api/admin/blogs/image/upload`;
		try {
			const { data } = await axiosInstance.post(url, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			return data;
		} catch (error) {
			throw error;
		}
	}
}

// ===== 커뮤니티 공지사항 API =====
export const noticeApi = {
	getNoticeDetail: async (noticeId: number, instance: AxiosInstance = axiosInstance): Promise<NoticeDetailResponse> => {
		try {
			const { data } = await instance.get(`/api/admin/notices/${noticeId}`);
			return {
				noticeImageList: data?.adminBlogImageDtos,
				noticeInfo: data?.noticeAdminDto,
			};
		} catch (error) {
			throw error;
		}
	},
}

// ===== 커뮤니티 아티클 API =====
export const articleApi = {
	getArticleDetail: async (articleId: number, instance: AxiosInstance = axiosInstance): Promise<ArticleDetailResponse> => {
		try {
			const { data } = await instance.get(`/api/admin/blogs/${articleId}`);
			return {
				articleImageList: data?.adminBlogImageDtos,
				articleInfo: data?.blogAdminDto,
			};
		} catch (error) {
			throw error;
		}
	},
	uploadThumbnailImage: async (file: File | null) => {
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
	},
	getRecommendArticle: async (instance: AxiosInstance = axiosInstance): Promise<RecommendArticleResponse> => {
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
	},
	updateRecommendArticle: async (body: RecommendArticleBody) => {
		const url = `/api/admin/articles`;
		try {
			const { data } = await axiosInstance.put(url, body);
			return data;
		} catch (error) {
			throw error;
		}
	}
}

// ===== 커뮤니티 이벤트 API =====
export const eventApi = {
	getEventDetail: async (eventId: number, instance: AxiosInstance = axiosInstance): Promise<EventDetailResponse> => {
		try {
			const { data } = await instance.get(`/api/admin/events/${eventId}`);
			return {
				eventImageList: data?.eventImageDtoList,
				eventInfo: data?.eventAdminDto,
			};
		} catch (error) {
			throw error;
		}
	},
	uploadEventImage: async (type: EventImageType, file: File | null) => {
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
	}
}

// ===== 커뮤니티 1:1문의 API =====
export const inquiryApi = {
	getInquiryList: async (
		page: number,
		searchParams: InquiryListSearchParams = INQUIRY_LIST_INITIAL_SEARCH_VALUES,
		instance: AxiosInstance = axiosInstance,
	): Promise<InquiryListResponse> => {
		const filtered = cleanQueryParams(searchParams);

		const query = new URLSearchParams(filtered).toString();

		try {
			const { data } = await instance.get(`/api/admin/questions?page=${page}&size=${PAGE_SIZE.COMMON}&${query}`);
			return {
				page: data.page,
				inquiryList: data?._embedded?.questionListSideAdminList || [],
			};
		} catch (error) {
			throw error;
		}
	},
	getInquiryDetail: async <T extends InquiryQuestionData | InquiryAnswerData> (
		type: 'question' | 'answer',
		id: number,
		instance: AxiosInstance = axiosInstance,
	): Promise<T> => {
		try {
			const { data } = await instance.get(`/api/admin/questions/${type === 'question' ? 'member' : 'admin'}/${id}`);
			return data;
		} catch (error) {
			throw error;
		}
	},
	getInquiryDetailWithAnswers: async (
		inquiryId: number,
		instance: AxiosInstance = axiosInstance
	): Promise<InquiryDetailData> => {
		// 질문 상세 먼저 불러옴
		const question = await getInquiryDetail<InquiryQuestionData>('question', inquiryId, instance);

		// answerIdList가 없다면 빈 배열
		const answerIds = (question as InquiryQuestionData).answerIdList ?? [];

		// 모든 답변을 병렬 요청
		const answers = await Promise.all(
			answerIds.map(id => getInquiryDetail<InquiryAnswerData>('answer', id, instance))
		);
		
		return { question, answers };
	},
	downloadFile: async (
		fileId: number,
		fileName: string,
	) => {
		// base64 문자열을 반환하는 API 호출
		const response = await axiosInstance.get(`/api/questions/file/${fileId}`);

		// base64 데이터 확인 (예: { imageData: "iVBORw0KGgoAAAANSUhEUgAA..." })
		const base64Data = response.data?.imageData;
		if (!base64Data) return;

		// data URL로 변환
		const downloadUrl = `data:image/png;base64,${base64Data}`;

		// 다운로드 트리거
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.setAttribute('download', fileName);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	},
	uploadCreateAnswerImage: async (file: File | null) => {
		const formData = createUploadFile(file);
		const url = `/api/admin/questions/file`;
		try {
			const { data } = await axiosInstance.post(url, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			return data;
		} catch (error) {
			throw error;
		}
	},
	deleteInquiry: async (id: number) => {
		try {
			const { data } = await axiosInstance.put(`/api/admin/questions`, { id });
			return data;
		} catch (error) {
			throw error;
		}
	}
}

export const {
	getCommunityList,
	deleteCommunity,
	updateCommunity,
	createCommunity,
	uploadCommunityImage,
} = communityCommonApi;

export const {
	getNoticeDetail,
} = noticeApi;

export const { 
	getArticleDetail,
	uploadThumbnailImage,
	getRecommendArticle,
	updateRecommendArticle,
} = articleApi;

export const {
	getEventDetail,
	uploadEventImage,
} = eventApi;

export const {
	getInquiryList,
	getInquiryDetail,
	getInquiryDetailWithAnswers,
	downloadFile,
	uploadCreateAnswerImage,
	deleteInquiry,
} = inquiryApi;