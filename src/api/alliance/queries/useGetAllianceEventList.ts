import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { AllianceCouponSelectOption } from "@/types/alliance";
import { getAllianceEventList} from "@/api/alliance/alliance";

export function useGetAllianceEventList(
	queryOptions?: UseQueryCustomOptions<AllianceCouponSelectOption[]>,
) {
	return useQuery<AllianceCouponSelectOption[]>({
		queryKey: [
			queryKeys.ALLIANCE.BASE,
			queryKeys.ALLIANCE.GET_ALLIANCE_EVENT_LIST,
		],
		queryFn: () => getAllianceEventList(),
		keepPreviousData: true,
		...queryOptions,
	});
}
