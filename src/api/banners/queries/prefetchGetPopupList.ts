import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { PopupListData } from "@/types/banners";
import { getBannerList } from "@/api/banners/banners";

export async function prefetchGetPopupList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<PopupListData[]>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST],
		queryFn: () => getBannerList('popup', 'popupBannerListResponseDtoList', ssrAxios as AxiosInstance),
	})
}