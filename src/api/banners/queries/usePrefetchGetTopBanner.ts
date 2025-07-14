import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { TopBannerData } from "@/types/banners";
import { getTopBanner } from "@/api/banners/banners";

export async function prefetchGetTopBanner(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<TopBannerData>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_TOP_BANNER],
		queryFn: () => getTopBanner(ssrAxios as AxiosInstance),
	})
}
