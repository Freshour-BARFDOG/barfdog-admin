import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { INITIAL_ALLIANCE_SEARCH_VALUES, INITIAL_COUPON_SEARCH_VALUES, PAYMENT_API_KEY } from "@/constants/alliance";
import {
	AllianceCouponDetailResponse, AllianceCouponFormValues,
	AllianceCouponListResponse,
	AllianceCouponListSearchParams, AllianceCouponSelectOption,
	AllianceDetailResponse,
	AllianceListSearchParams, AllianceManagementData, AllianceManagementFormValues, AllianceManagementResponse,
	AllianceManagementSearchParams,
	AllianceMemberListResponse,
	AllianceMemberSalesData, CreateAllianceEvent, ExcelDownloadAllianceCoupon, ExcelDownloadCreateAllianceCoupon, ExtendedAllianceData
} from "@/types/alliance";
import { PAGE_SIZE } from "@/constants/common";

// ===== 유틸리티 함수들 =====
const handleApiError = (error: unknown): never => {
	console.error('API Error:', error);
	throw error;
};

const createQueryString = (params: Record<string, any>): string => {
	const filtered = cleanQueryParams(params);
	return new URLSearchParams(filtered).toString();
};

const mergeAllianceAndEventInfos = (baseList: AllianceManagementData[], extendedList: ExtendedAllianceData[]) => {
	const map = new Map<string, ExtendedAllianceData>(extendedList?.map(e => [e.allianceCode, e]));
	return baseList?.map(item => {
		const ext = map.get(item.allianceCode);
		return {
			...item,
			allianceId: ext?.allianceId ?? 0,
			eventInfos: ext?.eventInfos ?? [],
		};
	}) || [];
};

// ===== 제휴사 목록 API =====
export const allianceManagementApi = {
	getAllianceManagement: async (
		page: number,
		searchParams: AllianceManagementSearchParams = { allianceName: '' },
		instance: AxiosInstance = axiosInstance,
	): Promise<AllianceManagementResponse> => {
		const query = createQueryString(searchParams);

		try {
			const [
				{ data: baseData },
				{ data: eventData },
			] = await Promise.all([
				instance.get(`/api/admin/alliance/management?page=${page}&size=${PAGE_SIZE.COMMON}&${query}`),
				instance.get(`/api/admin/alliance/event`),
			]);

			const baseList = baseData?._embedded?.allianceCouponManagementResponseList;
			const extendedList = eventData?._embedded?.allianceEventResponseList;

			const mergedList = mergeAllianceAndEventInfos(baseList, extendedList);

			return {
				page: baseData.page,
				managementList: mergedList,
			};
		} catch (error) {
			return handleApiError(error);
		}
	},

	createAlliance: async (body: AllianceManagementFormValues) => {
		try {
			const { data } = await axiosInstance.post('/api/admin/alliance/create', body);
			return data;
		} catch (error) {
			return handleApiError(error);
		}
	},

	getAllianceDetail: async (allianceId: number, instance: AxiosInstance = axiosInstance): Promise<AllianceDetailResponse> => {
		try {
			const { data } = await instance.get(`/api/admin/alliance/${allianceId}/detail`);
			return {
				allianceInfo: data.allianceInfo,
				allianceCouponUsedInfo: data.allianceCouponUsedInfo,
				allianceEventInfoList: data.allianceEventInfos,
			};
		} catch (error) {
			return handleApiError(error);
		}
	},

	deleteAllianceIdList: async (allianceIdList: number[]) => {
		try {
			const { data } = await axiosInstance.post('/api/admin/alliance/delete', { allianceIdList });
			return data;
		} catch (error) {
			return handleApiError(error);
		}
	},
};

// ===== 제휴사 상세 행사 API =====
export const allianceEventApi = {
	createAllianceEvent: async (body: CreateAllianceEvent) => {
		const query = createQueryString(body);
		try {
			const { data } = await axiosInstance.post(`/api/admin/alliance/allianceEvent/create?${query}`);
			return data;
		} catch (error) {
			return handleApiError(error);
		}
	},

	deleteAllianceEventIdList: async (allianceEventIdList: number[]) => {
		try {
			const { data } = await axiosInstance.post('/api/admin/alliance/allianceEvent/delete', { 
				allianceEventIds: allianceEventIdList 
			});
			return data;
		} catch (error) {
			return handleApiError(error);
		}
	},

	getAllianceEventList: async (instance: AxiosInstance = axiosInstance): Promise<AllianceCouponSelectOption[]> => {
		try {
			const { data } = await instance.get(`/api/admin/alliance/event`);
			return data?._embedded?.allianceEventResponseList.map((item: ExtendedAllianceData) => ({
				label: item.allianceName,
				value: item.allianceId,
				eventInfoList: item?.eventInfos.map(event => ({ 
					label: event.eventName, 
					value: event.allianceEventId 
				})) || [],
			})) || [];
		} catch (error) {
			return handleApiError(error);
		}
	},
};

// ===== 제휴사 가입자, 매출 내역 API =====
export const allianceListApi = {
	getAllianceMemberList: async (
		page: number,
		searchParams: AllianceListSearchParams = INITIAL_ALLIANCE_SEARCH_VALUES,
		instance: AxiosInstance = axiosInstance,
	): Promise<AllianceMemberListResponse> => {
		const query = createQueryString(searchParams);

		try {
			const { data } = await instance.get(`/api/admin/members?page=${page}&size=${PAGE_SIZE.COMMON}&alliance=cb&${query}`);
			return {
				page: data.page,
				memberList: data?._embedded?.queryMembersDtoList || [],
			};
		} catch (error) {
			return handleApiError(error);
		}
	},

	getAllianceSalesList: async (
		searchParams: AllianceListSearchParams = INITIAL_ALLIANCE_SEARCH_VALUES,
		instance: AxiosInstance = axiosInstance,
	): Promise<AllianceMemberSalesData[]> => {
		const query = createQueryString(searchParams);

		try {
			const { data } = await instance.get(`/api/alliance/payment?apiKey=${PAYMENT_API_KEY}&${query}`);
			return data;
		} catch (error) {
			return handleApiError(error);
		}
	},
};

// ===== 제휴사 쿠폰 API =====
export const allianceCouponApi = {
	getAllianceCouponList: async(
		page: number,
		rawSearchParams: AllianceCouponListSearchParams = INITIAL_COUPON_SEARCH_VALUES,
		instance: AxiosInstance = axiosInstance,
	): Promise<AllianceCouponListResponse> => {
		// 객체로 강제 변환
		const searchParams =
			typeof rawSearchParams === 'object' && rawSearchParams !== null
				? rawSearchParams
				: INITIAL_COUPON_SEARCH_VALUES;

		// status 분리
		const { status, ...rest } = searchParams;
		const query = createQueryString(rest);

		try {
			const { data } = await instance.get(
				`/api/admin/alliance/coupon/${status === 'ACTIVE' ? 'created' : 'deleted'}/history?page=${page}&size=${PAGE_SIZE.COMMON}&${query}`
			);
			return {
				page: data.page,
				couponList: data?._embedded?.queryAdminAllianceCouponEventResponseList || [],
			};
		} catch (error) {
			return handleApiError(error);
		}
	},

	getAllianceCouponDetail: async (couponBundle: string, instance: AxiosInstance = axiosInstance): Promise<AllianceCouponDetailResponse> => {
		try {
			const { data } = await instance.get(`/api/admin/alliance/coupon/created/detail?allianceCouponBundle=${couponBundle}`);
			return {
				couponInfo: data.couponInfo,
				couponUsedHistory: data.couponUsedHistory,
			};
		} catch (error) {
			return handleApiError(error);
		}
	},

	deleteAllianceCouponList: async (couponBundleList: string[]) => {
		try {
			const { data } = await axiosInstance.post('/api/admin/alliance/coupon/delete', { 
				allianceBundleList: couponBundleList 
			});
			return data;
		} catch (error) {
			return handleApiError(error);
		}
	},

	createAllianceCoupon: async (body: AllianceCouponFormValues) => {
		try {
			const { data } = await axiosInstance.post('/api/admin/coupons/alliance/create', body, {
				timeout: 50000
			});
			return data;
		} catch (error) {
			return handleApiError(error);
		}
	},

	excelDownloadAllianceCoupon: async (body: ExcelDownloadAllianceCoupon) => {
		try {
			const query = createQueryString(body);
			const { data } = await axiosInstance.get(`/api/admin/alliance/coupon/excel-download?${query}`, {
				responseType: 'blob',
			});
			return data;
		} catch (error) {
			return handleApiError(error);
		}
	},

	excelDownloadCreateAllianceCoupon: async (body: ExcelDownloadCreateAllianceCoupon) => {
		const { bundle, couponPublishCount, useExpiredDate, useStartDate } = body;
		const query = new URLSearchParams({
			bundle,
			couponPublishCount: String(couponPublishCount),
			useExpiredDate: useExpiredDate,
			useStartDate,
		}).toString();

		try {
			const { data } = await axiosInstance.post(`/api/admin/coupons/excel-download?${query}`, undefined, {
				responseType: 'blob',
				timeout: 50000
			});

			if (data && data instanceof Blob) {
				return data;
			} else {
				throw new Error('다운로드 응답이 유효하지 않습니다.');
			}
		} catch (error) {
			return handleApiError(error);
		}
	},
};

// ===== 기존 함수들 (하위 호환성을 위해 유지) =====
export const {
	getAllianceManagement,
	createAlliance,
	getAllianceDetail,
	deleteAllianceIdList,
} = allianceManagementApi;

export const {
	createAllianceEvent,
	deleteAllianceEventIdList,
	getAllianceEventList,
} = allianceEventApi;

export const {
	getAllianceMemberList,
	getAllianceSalesList,
} = allianceListApi;

export const {
	getAllianceCouponList,
	getAllianceCouponDetail,
	deleteAllianceCouponList,
	excelDownloadAllianceCoupon,
	createAllianceCoupon,
	excelDownloadCreateAllianceCoupon,
} = allianceCouponApi;