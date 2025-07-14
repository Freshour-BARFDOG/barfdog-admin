import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { MainBannerListrData } from "@/types/banners";
import { getMainBannerList } from "@/api/banners/banners";

export async function prefetchGetMainBannerList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<MainBannerListrData[]>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
		queryFn: () => getMainBannerList(ssrAxios as AxiosInstance),
	})
}
