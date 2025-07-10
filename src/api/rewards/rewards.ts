import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { REWARD_LIST_INITIAL_SEARCH_VALUES } from "@/constants/benefits/rewards";
import { PAGE_SIZE } from "@/constants/common";
import {
	ReleaseRewardRequestBody,
	RewardListResponse,
	RewardListSearchParams,
	RewardTarget
} from "@/types/benefits/rewards";

const getRewardList = async (
	page: number,
	searchParams: RewardListSearchParams = REWARD_LIST_INITIAL_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<RewardListResponse> => {
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/rewards?page=${page}&size=${PAGE_SIZE.REWARDS.REWARD}&${query}`);
		return {
			page: data.page,
			rewardList: data?._embedded?.queryAdminRewardsDtoList || [],
		};
	} catch (error) {
		throw error;
	}
};

const excelDownloadRewardList = async (searchParams: RewardListSearchParams, instance: AxiosInstance = axiosInstance) => {
	const filtered = cleanQueryParams(searchParams);
	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.post(`/api/admin/rewards/excel?${query}`, undefined, {
			responseType: 'blob',
		})
		return data;
	} catch (error) {
		throw error;
	}
}

const releaseReward = async (rewardTarget: RewardTarget, body: ReleaseRewardRequestBody) => {
	try {
		const { data } = await axiosInstance.post(`/api/admin/rewards/${rewardTarget.toLocaleLowerCase()}`, body);
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	getRewardList,
	excelDownloadRewardList,
	releaseReward,
}