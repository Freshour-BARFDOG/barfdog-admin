import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { AllianceListSearchParams, AllianceMemberSalesData } from "@/types/alliance";
import { getAllianceSalesList } from "@/api/alliance/alliance";

export function useGetAllianceSalesList(
	searchParams: AllianceListSearchParams,
	queryOptions?: UseQueryCustomOptions<AllianceMemberSalesData[]>,
) {
	return useQuery<AllianceMemberSalesData[]>({
		queryKey: [
			queryKeys.ALLIANCE.BASE,
			queryKeys.ALLIANCE.GET_ALLIANCE_SALES_LIST,
			searchParams,
		],
		queryFn: () => getAllianceSalesList(searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}
