import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { MainBannerFormValues } from "@/types/banners";
import { getBannerDetail} from "@/api/banners/banners";

export async function prefetchGetMainBannerDetail(bannerId: number, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<MainBannerFormValues>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_DETAIL, bannerId],
		queryFn: () => getBannerDetail('main', bannerId, ssrAxios as AxiosInstance),
	})
}
