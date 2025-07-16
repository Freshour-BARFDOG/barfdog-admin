import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { CommunityListResponse, CommunityType } from "@/types/community";
import { getCommunityList } from "@/api/community/community";

export async function prefetchGetCommunityList({
	queryClient,
	queryKey,
	type,
	key,
	size,
}: {
	queryClient: QueryClient;
	queryKey: (string | number)[];
	type: CommunityType;
	key: string;
	size: number;
}) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<CommunityListResponse>({
		queryKey: queryKey,
		queryFn: async () =>  await getCommunityList(
			type,
			key,
			0,
			size,
			ssrAxios
		),
	})
}