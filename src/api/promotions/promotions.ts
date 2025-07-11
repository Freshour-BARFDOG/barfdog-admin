import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { PAGE_SIZE } from "@/constants/common";
import {
	PROMOTION_LIST_INITIAL_SEARCH_VALUES,
	PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES
} from "@/constants/benefits/promotions";
import {
	PromotionListResponse,
	PromotionListSearchParams,
	PromotionMemberListResponse,
	PromotionMemberListSearchParams, PromotionFormValues,
	PromotionCouponListData,
	PromotionData,
	PromotionCoupon
} from "@/types/benefits/promotions";

const getPromotionList = async (
	page: number,
	searchParams: PromotionListSearchParams = PROMOTION_LIST_INITIAL_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<PromotionListResponse> => {
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/promotions?page=${page}&size=${PAGE_SIZE.REWARDS.PROMOTION}&${query}`);
		console.log('data', data)
		return {
			page: data.page,
			promotionList: data?._embedded?.queryAdminPromotionsDtoList
				.map((promotion: { promotionCouponDto: PromotionCoupon, promotionDto: PromotionData }) => 
					({ 
						...promotion.promotionCouponDto, 
						...promotion.promotionDto 
					})) || [],
		};
	} catch (error) {
		throw error;
	}
};

const getPromotionDetail = async (promotionId: number, instance: AxiosInstance = axiosInstance) => {
	try {
		const { data } = await instance.get(`/api/admin/promotions/${promotionId}`);
		return data;
	} catch (error) {
		throw error;
	}
}

const getPromotionMemberList = async (
	promotionId: number,
	page: number,
	searchParams: PromotionMemberListSearchParams = PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<PromotionMemberListResponse> => {
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/promotions/${promotionId}/members?page=${page}&size=${PAGE_SIZE.REWARDS.PROMOTION}&${query}`);
		return {
			page: data.page,
			promotionMemberList: data?._embedded?.queryAdminPromotionMembersDtoList || [],
		};
	} catch (error) {
		throw error;
	}
};

const createPromotion = async (body: PromotionFormValues) => {
	try {
		const { data } = await axiosInstance.post(`/api/admin/promotions`, body);
		return data;
	} catch (error) {
		throw error;
	}
}


const updatePromotion = async (promotionId: number, body: PromotionFormValues) => {
	try {
		const { data } = await axiosInstance.put(`/api/admin/promotions/${promotionId}/update`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

const deletePromotion = async (promotionId: number) => {
	try {
		const { data } = await axiosInstance.put(`/api/admin/promotions/${promotionId}/delete`, { id: promotionId });
		return data;
	} catch (error) {
		throw error;
	}
}

const getPromotionCouponList = async (instance: AxiosInstance = axiosInstance) => {
	try {
		const { data } = await instance.get(`/api/admin/coupons/publication/promotion`);
		return data?._embedded?.publicationCouponDtoList
			.map((coupon: PromotionCouponListData) => ({ 
				label: `[할인: ${coupon.discount}] ${coupon.name}`, 
				value: coupon.couponId 
			})) || [];
	} catch (error) {
		throw error;
	}
}

export {
	getPromotionList,
	getPromotionDetail,
	getPromotionMemberList,
	createPromotion,
	updatePromotion,
	deletePromotion,
	getPromotionCouponList,
}