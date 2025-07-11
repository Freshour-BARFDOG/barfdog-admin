import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { MyPageBannerData } from "@/types/banners";
import { getMyPageBanner } from "@/api/banners/banners";

export async function prefetchGetMyPageBanner(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<MyPageBannerData>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MYPAGE_BANNER],
		queryFn: () => getMyPageBanner(ssrAxios as AxiosInstance),
	})
}
