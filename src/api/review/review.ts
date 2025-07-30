import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { PAGE_SIZE } from "@/constants/common";
import { REVIEW_ACTION_MAP, REVIEW_LIST_INITIAL_SEARCH_VALUES } from "@/constants/review";
import {
	BestReviewData, ProductItem, ProductItemType,
	ReviewActionPayloadMap,
	ReviewActionType,
	ReviewDetailResponse, ReviewFormValues,
	ReviewListResponse,
	ReviewListSearchParams,
} from "@/types/review";
import { SelectOption } from "@/types/common";

// 리뷰 목록 조회
const getReviewList = async (
	page: number,
	searchParams: ReviewListSearchParams = REVIEW_LIST_INITIAL_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<ReviewListResponse> => {
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/reviews?page=${page}&size=${PAGE_SIZE.COMMON}&${query}`);
		return {
			page: data.page,
			reviewList: data?._embedded?.queryAdminReviewsDtoList || [],
		};
	} catch (error) {
		throw error;
	}
};

// 리뷰 상세 조회
const getReviewDetail = async (reviewId: number, instance: AxiosInstance = axiosInstance): Promise<ReviewDetailResponse> => {
	try {
		const { data } = await instance.get(`/api/admin/reviews/${reviewId}`);
		return {
			reviewInfo: data.reviewDto,
			imageUrlList: data.imageUrlList,
			bestReview: data.bestReview,
		};
	} catch (error) {
		throw error;
	}
}

// 리뷰 액션 타입에 따라 API 요청을 동적으로 수행
const performReviewAction = async <T extends ReviewActionType>(
	action: T,
	payload: ReviewActionPayloadMap[T]
) => {
	const config = REVIEW_ACTION_MAP[action];
	const url = config.getUrl ? config.getUrl(payload) : '';
	const body = config.getBody ? config.getBody(payload) : undefined;

	const { data } = await axiosInstance[config.method](url, body);
	return data;
};

// 베스트 리뷰 목록 조회
const getBestReviewList = async (instance: AxiosInstance = axiosInstance): Promise<BestReviewData[]> => {
	try {
		const { data } = await instance.get(`/api/admin/reviews/best`);
		return data?._embedded?.queryAdminBestReviewsDtoList.sort((a: BestReviewData, b: BestReviewData) => a.leakedOrder - b.leakedOrder) || [];
	} catch (error) {
		throw error;
	}
}

const getProductItemList = async (type: ProductItemType, instance: AxiosInstance = axiosInstance): Promise<SelectOption<number>[]> => {
	try {
		const key = type === 'recipes' ? 'reviewRecipesDtoList' : 'reviewItemsDtoList';

		const { data } = await instance.get(`/api/admin/reviews/${type !== 'recipes' ? 'items/' : ''}${type}`);
		return data?._embedded?.[key].map((item: ProductItem) => ({ label: item.name, value: item.id })) || [];
	} catch (error) {
		throw error;
	}
}

const createReview = async (body: ReviewFormValues) => {
	try {
		const { data } = await axiosInstance.post(`/api/admin/reviews`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	getReviewList,
	getReviewDetail,
	performReviewAction,
	getBestReviewList,
	getProductItemList,
	createReview,
}
