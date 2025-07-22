import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { INITIAL_ALLIANCE_SEARCH_VALUES, PAYMENT_API_KEY } from "@/constants/alliance";
import {
	AllianceDetailResponse,
	AllianceListSearchParams, AllianceManagementData, AllianceManagementFormValues, AllianceManagementResponse,
	AllianceManagementSearchParams,
	AllianceMemberListResponse,
	AllianceMemberSalesData, CreateAllianceEvent, ExtendedAllianceData
} from "@/types/alliance";
import { PAGE_SIZE } from "@/constants/common";

function mergeAllianceAndEventInfos(baseList: AllianceManagementData[], extendedList: ExtendedAllianceData[]) {
	const map = new Map<string, ExtendedAllianceData>(extendedList?.map(e => [e.allianceCode, e]));
	return baseList?.map(item => {
		const ext = map.get(item.allianceCode);
		return {
			...item,
			allianceId: ext?.allianceId ?? 0,
			eventInfos: ext?.eventInfos ?? [],
		};
	}) || [];
}

const getAllianceManagement = async (
	page: number,
	searchParams: AllianceManagementSearchParams = { allianceName: '' },
	instance: AxiosInstance = axiosInstance,
): Promise<AllianceManagementResponse> => {
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

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
		throw error;
	}
};

const createAlliance = async (body: AllianceManagementFormValues) => {
	try {
		const { data } = await axiosInstance.post('/api/admin/alliance/create', body);
		return data;
	} catch (error) {
		throw error;
	}
}

const getAllianceMemberList = async (
	page: number,
	searchParams: AllianceListSearchParams = INITIAL_ALLIANCE_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<AllianceMemberListResponse> => {
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/members?page=${page}&size=${PAGE_SIZE.COMMON}&alliance=cb&${query}`);
		return {
			page: data.page,
			memberList: data?._embedded?.queryMembersDtoList || [],
		};
	} catch (error) {
		throw error;
	}
};

const getAllianceSalesList = async (
	searchParams: AllianceListSearchParams = INITIAL_ALLIANCE_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<AllianceMemberSalesData[]> => {
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/alliance/payment?apiKey=${PAYMENT_API_KEY}&${query}`);
		return data;
	} catch (error) {
		throw error;
	}
};

const getAllianceDetail = async (allianceId: number, instance: AxiosInstance = axiosInstance): Promise<AllianceDetailResponse> => {
	try {
		const { data } = await instance.get(`/api/admin/alliance/${allianceId}/detail`);
		return {
			allianceInfo: data.allianceInfo,
			allianceCouponUsedInfo: data.allianceCouponUsedInfo,
			allianceEventInfoList: data.allianceEventInfos,
		};
	} catch (error) {
		throw error;
	}
}

const deleteAllianceIdList = async (allianceIdList: number[]) => {
	try {
		const body = {
			allianceIdList: allianceIdList
		};
		const { data } = await axiosInstance.post('/api/admin/alliance/delete', body);
		return data;
	} catch (error) {
		throw error;
	}
}

const createAllianceEvent = async (body: CreateAllianceEvent) => {
	const filtered = cleanQueryParams(body);

	const query = new URLSearchParams(filtered).toString();
	try {
		const { data } = await axiosInstance.post(`/api/admin/alliance/allianceEvent/create?${query}`);
		return data;
	} catch (error) {
		throw error;
	}
}

const deleteAllianceEventIdList = async (allianceEventIdList: number[]) => {
	try {
		const body = {
			allianceEventIdList: allianceEventIdList
		};
		const { data } = await axiosInstance.post('/api/admin/alliance/allianceEvent/delete', body);
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	getAllianceManagement,
	createAlliance,
	getAllianceMemberList,
	getAllianceSalesList,
	getAllianceDetail,
	deleteAllianceIdList,
	createAllianceEvent,
	deleteAllianceEventIdList,
}