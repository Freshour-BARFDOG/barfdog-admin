import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { AllianceManagementResponse, AllianceManagementSearchParams } from "@/types/alliance";
import { getAllianceManagement } from "@/api/alliance/alliance";

export function useGetAllianceManagement(
	page: number,
	searchParams: AllianceManagementSearchParams,
	queryOptions?: UseQueryCustomOptions<AllianceManagementResponse>,
) {
	return useQuery<AllianceManagementResponse>({
		queryKey: [
			queryKeys.ALLIANCE.BASE,
			queryKeys.ALLIANCE.GET_ALLIANCE_MANAGEMENT,
			page,
			searchParams,
		],
		queryFn: () => getAllianceManagement(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}
