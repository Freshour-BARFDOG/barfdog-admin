import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { CommunityListResponse, CommunityType } from "@/types/community";
import { getCommunityList } from "@/api/community/community";

export function useGetCommunityList({
	type, key, page, size, queryKey, queryOptions,
}: {
	type: CommunityType,
	key: string,
	page: number,
	size: number,
	queryKey: (string | number)[],
	queryOptions?: UseQueryCustomOptions<CommunityListResponse>,
}) {
	return useQuery<CommunityListResponse>({
		queryKey: queryKey,
		queryFn: async () => await getCommunityList(type, key, page, size),
		keepPreviousData: true,
		...queryOptions,
	});
}