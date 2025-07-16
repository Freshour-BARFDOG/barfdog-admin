import { useQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { PopupListData } from "@/types/banners";
import { getBannerList } from "@/api/banners/banners";

export function useGetPopupList(queryOptions?: UseSuspenseQueryCustomOptions<PopupListData[]>) {
	return useQuery<PopupListData[]>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST],
		queryFn: async () => await getBannerList('popup', 'popupBannerListResponseDtoList'),
		...queryOptions,
	})
}
