import { useQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { PopupFormValues } from "@/types/banners";
import { getBannerDetail } from "@/api/banners/banners";

export function useGetPopupDetail(popupId: number, queryOptions?: UseSuspenseQueryCustomOptions<PopupFormValues>) {
	return useQuery<PopupFormValues>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_DETAIL, popupId],
		queryFn: async () => await getBannerDetail('popup', popupId),
		...queryOptions,
	})
}
