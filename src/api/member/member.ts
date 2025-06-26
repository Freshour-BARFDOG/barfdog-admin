import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { MemberListResponse, MemberListSearchParams } from "@/types/member";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { INITIAL_SEARCH_VALUES } from "@/constants/member";


const getMemberList = async (
	page: number,
	searchParams: MemberListSearchParams = INITIAL_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<MemberListResponse> => {
	const { size, ...filters } = searchParams;

	const filtered = cleanQueryParams(filters);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/members?page=${page}&size=${size}&${query}`);
		return {
			page: data.page,
			memberList: data?._embedded?.queryMembersDtoList || [],
		};
	} catch (error) {
		throw error;
	}
};

export {
	getMemberList,
}