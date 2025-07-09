import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import {
	CouponListResponse,
	CouponListSearchParams, CreateCouponFormValues,
	MemberCouponListBody,
	MemberCouponListResponse,
	ReleaseCouponRequestBody,
	ReleaseCouponTarget,
	ReleaseCouponType,
	UpdateMemberCoupon
} from "@/types/benefits/coupons";
import { COUPON_LIST_INITIAL_SEARCH_VALUES } from "@/constants/benefits/coupons";

const getCouponList = async (
	page: number,
	searchParams: CouponListSearchParams = COUPON_LIST_INITIAL_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<CouponListResponse> => {
	const couponListSize = 10;
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/coupons/search?page=${page}&size=${couponListSize}&${query}`);
		return {
			page: data.page,
			couponList: data?._embedded?.couponListResponseDtoList || [],
		};
	} catch (error) {
		throw error;
	}
};

const updateCouponInactive = async (couponId: number) => {
	try {
		const { data } = await axiosInstance.put(`/api/admin/coupons/${couponId}/inactive`);
		return data;
	} catch (error) {
		throw error;
	}
}

const getMemberCouponList = async (
	page: number,
	body: MemberCouponListBody,
	instance: AxiosInstance = axiosInstance,
): Promise<MemberCouponListResponse> => {
	const memberCouponListSize = 10;

	try {
		const { data } = await instance.post(`/api/admin/coupons/memberCoupon?page=${page}&size=${memberCouponListSize}`, body);
		return {
			page: data.page,
			memberCouponList: data?._embedded?.queryMemberCouponDtoList || [],
		};
	} catch (error) {
		throw error;
	}
};

const updateMemberCoupon = async (couponId: number, body: UpdateMemberCoupon) => {
	try {
		const { data } = await axiosInstance.put(`/api/admin/coupons/memberCoupon/${couponId}`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

const getPublicationCouponList = async (couponType: ReleaseCouponType, instance: AxiosInstance = axiosInstance) => {
	const type = couponType === 'CODE_PUBLISHED' ? 'code' : 'general';
	try {
		const { data } = await instance.get(`/api/admin/coupons/publication/${type}`);
		return data?._embedded?.publicationCouponDtoList || [];
	} catch (error) {
		throw error;
	}
}

const releaseCoupon = async (couponTarget: ReleaseCouponTarget, body: ReleaseCouponRequestBody) => {
	try {
		const { data } = await axiosInstance.post(`/api/admin/coupons/${couponTarget.toLocaleLowerCase()}`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

const createCoupon = async (body: CreateCouponFormValues) => {
	try {
		const { data } = await axiosInstance.post(`/api/admin/coupons`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	getCouponList,
	updateCouponInactive,
	getMemberCouponList,
	updateMemberCoupon,
	getPublicationCouponList,
	releaseCoupon,
	createCoupon,
}