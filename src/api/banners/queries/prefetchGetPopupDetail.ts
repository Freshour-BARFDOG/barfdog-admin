import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { PopupFormValues } from "@/types/banners";
import { getBannerDetail } from "@/api/banners/banners";

export async function prefetchGetPopupDetail(popupId: number, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<PopupFormValues>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_DETAIL, popupId],
		queryFn: () => getBannerDetail('popup', popupId, ssrAxios as AxiosInstance),
	})
}
