import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { AddressData, MemberListResponse, MemberListSearchParams, MemberSubscriptionData } from "@/types/member";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { INITIAL_SEARCH_VALUES } from "@/constants/member";

const getMemberList = async (
	page: number,
	searchParams: MemberListSearchParams = INITIAL_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<MemberListResponse> => {
	const memberListSize = 10;
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/members?page=${page}&size=${memberListSize}&${query}`);
		return {
			page: data.page,
			memberList: data?._embedded?.queryMembersDtoList || [],
		};
	} catch (error) {
		throw error;
	}
};

const excelDownloadMemberList = async (searchParams: MemberListSearchParams, instance: AxiosInstance = axiosInstance) => {
	const filtered = cleanQueryParams(searchParams);
	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.post(`/api/admin/members/excel-download?${query}`, undefined, {
			responseType: 'blob',
		})
		return data;
	} catch (error) {
		throw error;
	}
}

const getMemberDetail = async (memberId: number, instance: AxiosInstance = axiosInstance) => {
	try {
		const { data } = await instance.get(`/api/admin/members/${memberId}`);
		return data;
	} catch (error) {
		throw error;
	}
}

const getMemberSubscriptionList = async (memberId: number, instance: AxiosInstance = axiosInstance) => {
	const { data } = await instance.get(`/api/admin/members/${memberId}/subscribes`);
	return data._embedded?.memberSubscribeAdminDtoList
		.map((value: { 
			querySubscribeAdminDto: MemberSubscriptionData, 
			recipeNames: string[]
		}) => 
			({ 
				recipeNames: value.recipeNames, 
				data: value.querySubscribeAdminDto 
			})) 
		?? [];
};

const updateMemberBirthday = async (memberId: number, body: { birthday: string }) => {
	try {
		const { data } = await axiosInstance.put(`/api/admin/members/${memberId}/birthday`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

const updateMemberGrade = async (memberId: number, body: { grade: string }) => {
	try {
		const { data } = await axiosInstance.put(`/api/admin/members/${memberId}/grade`, body);
		return data;
	} catch (error) {
		throw error;
	}
}


const updateMemberAddress = async (memberId: number, body: { address: AddressData }) => {
	try {
		const { data } = await axiosInstance.put(`/api/admin/members/${memberId}/address`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	getMemberList,
	excelDownloadMemberList,
	getMemberDetail,
	getMemberSubscriptionList,
	updateMemberBirthday,
	updateMemberGrade,
	updateMemberAddress,
}