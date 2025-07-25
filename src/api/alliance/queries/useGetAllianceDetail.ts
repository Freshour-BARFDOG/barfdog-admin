import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { AllianceDetailResponse } from "@/types/alliance";
import { getAllianceDetail } from "@/api/alliance/alliance";

export function useGetAllianceDetail(
	allianceId: number,
	queryOptions?: UseQueryCustomOptions<AllianceDetailResponse>,
) {
	return useQuery<AllianceDetailResponse>({
		queryKey: [
			queryKeys.ALLIANCE.BASE,
			queryKeys.ALLIANCE.GET_ALLIANCE_DETAIL,
			allianceId,
		],
		queryFn: () => getAllianceDetail(allianceId),
		keepPreviousData: true,
		...queryOptions,
	});
}
