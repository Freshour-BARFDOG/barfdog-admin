import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { AllianceMemberListResponse, AllianceListSearchParams } from "@/types/alliance";
import { getAllianceMemberList } from "@/api/alliance/alliance";

export function useGetAllianceMemberList(
	page: number,
	searchParams: AllianceListSearchParams,
	queryOptions?: UseQueryCustomOptions<AllianceMemberListResponse>,
) {
	return useQuery<AllianceMemberListResponse>({
		queryKey: [
			queryKeys.ALLIANCE.BASE,
			queryKeys.ALLIANCE.GET_ALLIANCE_MEMBER_LIST,
			page,
			searchParams,
		],
		queryFn: () => getAllianceMemberList(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}
